import sys
sys.path.append('../../database/src')

from database import db
from product import Product
from type import Type
from admin import Admin
from error import Error
from order import Order
from user import User
from order_detail import Order_detail
import json
import ast
from datetime import datetime
from sqlalchemy import extract, func
from help_admin import ErrorMessage, create_product_id, token_to_id, add_to_database

def get_overview(token):
    """
    """
    all_orders = Order_detail.query.all()
    gmv = 0
    if len(all_orders) == 0:
        return gmv
    for order in all_orders:
        gmv += order.quantity * order.product_price
    
    all_orders_month = Order_detail.query.filter(extract('month', Order_detail.create_time) == datetime.now().month).all()
    mgmv = 0
    if len(all_orders_month) == 0:
        return mgmv
    for order in all_orders_month:
        mgmv += order.quantity * order.product_price

    atv = 0
    atv = gmv / len(all_orders)

    bp = 0
    count = 0
    all_orders_group = Order_detail.query.with_entities(Order_detail.product_id, func.sum(Order_detail.quantity * Order_detail.product_price).label("count")).group_by(Order_detail.product_id).all()
    for order in all_orders_group:
        if order.count >= count:
            count = order.count

    all_users = User.query.all()
    ou = len(all_users)
    return [round(gmv), round(mgmv), round(atv), round(count), ou]
