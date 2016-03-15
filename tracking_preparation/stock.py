# -*- coding: utf-8 -*-
###############################################################################
#
#   Module for Odoo
#   Copyright (C) 2015 Akretion (http://www.akretion.com).
#   @author Valentin CHEMIERE <valentin.chemiere@akretion.com>
#
#   This program is free software: you can redistribute it and/or modify
#   it under the terms of the GNU Affero General Public License as
#   published by the Free Software Foundation, either version 3 of the
#   License, or (at your option) any later version.
#
#   This program is distributed in the hope that it will be useful,
#   but WITHOUT ANY WARRANTY; without even the implied warranty of
#   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#   GNU Affero General Public License for more details.
#
#   You should have received a copy of the GNU Affero General Public License
#   along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
###############################################################################

from openerp.osv import osv, fields
import datetime

class stock_picking(osv.osv):

    _inherit = "stock.picking"

    _columns = {
        "preparator_id": fields.many2one('res.partner', 'Preparator'),
        "preparation_date": fields.datetime('Preparation date')
    }

    def set_preparation(self, cr, uid, picking_name, preparator,
                        context=None):
        if not picking_name:
            return False
        picking_obj = self.pool.get('stock.picking.out')
        picking_ids = picking_obj.search(cr, uid,
                                         (['name', '=', picking_name],))
        date = datetime.datetime.strftime(datetime.datetime.now(), '%Y-%m-%d %H:%M:%S')
        if picking_ids:
            picking_obj.write(
                cr, uid, picking_ids[0],
                {'preparator_id': preparator['id'],
                 'preparation_date': date})
        return True

class stock_picking_out(osv.osv):

    _inherit = "stock.picking.out"

    def __init__(self, pool, cr):
        self._columns['preparator_id'] = stock_picking._columns['preparator_id']
        self._columns['preparation_date'] = stock_picking._columns['preparation_date']
        super(stock_picking_out, self).__init__(pool, cr)

