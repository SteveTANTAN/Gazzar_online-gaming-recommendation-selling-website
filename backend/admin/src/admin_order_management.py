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
from help_admin import ErrorMessage, create_product_id, token_to_id, add_to_database

def order_search(search_text, value):
    """
    """
    data = []
    # search
    if value == "1":
        product_search_text = search_text
        all_orders = Order_detail.query.filter(Order_detail.product_name.like("%" + product_search_text + "%"))\
        .all()
    if value == "0":
        order_search_text = search_text
        all_orders = Order_detail.query.filter(Order_detail.order_id.like("%" + order_search_text + "%"))\
        .all()
    # print(all_orders)
    for target_order in all_orders:
        temp = {}
        temp['Order_id'] = target_order.order_id
        temp['product_name'] = target_order.product_name
        temp['quantity'] = target_order.quantity
        temp["discount"] = str(target_order.product_discount) + "%"
        temp['tranding_hours'] = str(target_order.create_time) + "  (UTC+5)"
        temp['actual_price'] = float(target_order.product_price)
        data.append(temp)
    return data

def get_order_all(token):
    """
    """
    data = []
    all_orders = Order_detail.query.all()
    for target_order in all_orders:
        temp = {}
        temp['Order_id'] = target_order.order_id
        temp['product_name'] = target_order.product_name
        temp['quantity'] = target_order.quantity
        temp["discount"] = str(target_order.product_discount) + "%"
        temp['tranding_hours'] = str(target_order.create_time) + "  (UTC+5)"
        temp['actual_price'] = float(target_order.product_price)
        data.append(temp)
    return data

# if __name__ == "__main__":
#     # print(get_order_all("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZG1pbl9pZCI6MTB9.JLD60aL9jiayokFfFuspdcwZz7m7bHyFP4ACX3Q3ES"))
#     print(order_search({"search_text": "new", "value": 1}))