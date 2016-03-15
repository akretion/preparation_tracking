'use strict';
angular.module('starter')
.controller('TrackProdCtrl', ['$scope', '$state', '$stateParams', '$ionicLoading', 'jsonRpc', 'Print', '$timeout', function ($scope, $state, $stateParams, $ionicLoading, jsonRpc, Print, $timeout) {

  $scope.$on('$ionicView.beforeEnter', function() {
    $scope.logs = [];
    $ionicLoading.show({
      template:'Chargement'
    });
  
    $scope.form = { reference: null}
    $scope.get_users();

    $ionicLoading.hide();
    window.jsonRpc = jsonRpc;
  });

  $scope.get_users = function () {
    $scope.error = null;
    var ref = $scope.form.reference;

    $ionicLoading.show({
      template:'Chargement'
    });

    jsonRpc.call('res.partner', 'get_preparator', [ref])
    .then(function (x) {
      $scope.users = x;
      if (!x) {
        $scope.logs.unshift(ref + " introuvable");
        return console.log('introuvable');
      }

    }).then($scope.initSearch).catch(function (x) {
      console.log('erreur survenue');
      $scope.logs.unshift(x);
    }).finally($ionicLoading.hide);

  };

  $scope.select = function(x) {
      console.log("user selected");
      $scope.user = x;
      $scope.logs.unshift($scope.user.name + " selectionné");
  }

  $scope.write = function(pick) {
    var ref = $scope.form.reference;
    $scope.pick = pick
    $scope.logs.unshift($scope.pick + " enregistrement...");
    jsonRpc.call('stock.picking', 'set_preparation', [$scope.pick, $scope.user]).then(function (x) {
      $scope.logs.unshift($scope.pick + " enregistré");
    });

  };

  $scope.print = function() {
    Print.print({ payload:"yea" })
  }
  $scope.clearLogs = function () {
    $scope.logs = [];
  }

}]);
