"""
customer_product.py is used for customer product-relevant operation
This file will include the search, show_product_details
"""
from cgitb import reset
from tabnanny import check
from unittest import result

import sys
sys.path.append('../../database/src')
from database import db
from product import Product
from type import Type
from user import User
from json import dumps
from error import Error

from sqlalchemy import or_,and_
from help import token_to_id, ErrorMessage
import ast
import pprint

def search(str):
    '''search product with given str, match in product name and description'''
    #print(str)
    task_filter = {or_(Product.name.contains(str),Product.description.contains(str))}
    search_result = Product.query.filter(*task_filter).all()
    result = []
    for i in search_result:
        temp = {"product_id": i.product_id, "name": i.name}
        result.append(temp)
    #result =[{"product_id": 31, "name": "Grand Theft Auto (series)"}, {"product_id": 32, "name": "Grand Theft Auto (series)"}, {"product_id": 33, "name": "Grand Theft Auto (series)"}, {"product_id": 34, "name": "Grand Theft Auto (series) on PC"}, {"product_id": 35, "name": "Grand Theft Auto (series)"}, {"product_id": 36, "name": "Grand Theft Auto (series)"}, {"product_id": 37, "name": "Grand Theft Auto III"}, {"product_id": 38, "name": "Grand Theft Auto V"}, {"product_id": 39, "name": "Grand Theft Auto: Episodes from Liberty City"}, {"product_id": 40, "name": "Grand Theft Auto: Vice City"}, {"product_id": 43, "name": "Hearts of Iron"}]
    return result

def show_product_details(token, product_id):
    u_id = token_to_id(token)
    # check valid user
    users = User.query.filter(User.user_id==u_id).all()
    if (len(users) == 0):
        raise ErrorMessage(Error.query.filter(Error.error_id == 2).all()[0].error_name)
    # check valid product
    products = Product.query.filter(Product.product_id==product_id).all()
    if len(products) == 0:
        raise ErrorMessage(Error.query.filter(Error.error_id==16).all()[0].error_name)
    target_product = products[0]

    # convert main_image and sub_image string to list
    cover = ast.literal_eval(target_product.main_image)
    cover_image = [{'image': cover[0]['thumbUrl']}]
    photo = ast.literal_eval(target_product.sub_image)
    photo_images = []
    for i in photo:
        cur_image = {'image': i['thumbUrl']}
        photo_images.append(cur_image)

    # convet product genre to list of type name
    tags = []
    for a in target_product.genre:
        tags.append(a.type_name)

    product_details = {'product_id': target_product.product_id, 'name': target_product.name, 'description': target_product.description,
                    'price': float(target_product.price), 'discount': target_product.discount, 'stock': target_product.stock,
                    'main_image': cover_image, 'sub_image': photo_images, 'rate': float(target_product.rate), 'comment': target_product.comment, 'type': tags}

    return product_details

if __name__ == "__main__":
    db.create_all()
    result = show_product_details('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjB9.iQfXIXBl6UUzeise2YrpHK43XimDKNSu6iCE7NKtB5w', 123)
    # result = search('grand')
    pprint.pprint(result)



 #cart input pro_id pro_quantity token