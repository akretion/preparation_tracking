'use strict';

angular.module('starter').factory('Print',['$http', 'Config', function ($http, Config) {

    return {
    	print: function (payload, qte) {
	        var req = {
	            args: ['label', payload.label],
	            kwargs: { options : { 'copies': (qte) ? qte : payload.quantities }}
	        };
	        $http.post(Config.printServer+'/cups/printData', req);
	        console.log('print !!!!', payload);
	    }
    };
}])
