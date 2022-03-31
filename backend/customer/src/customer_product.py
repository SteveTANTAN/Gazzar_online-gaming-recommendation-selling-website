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
from order_detail import Order_detail
from order import Order

from sqlalchemy import or_,and_
from help import token_to_id, ErrorMessage, product_dict_form, get_type
import ast
import pprint
import random

def search(str):
    '''search product with given str, match in product name and description'''
    #print(str)
    task_filter = {or_(Product.name.contains(str),Product.description.contains(str))}
    search_result = Product.query.filter(*task_filter).all()
    result = []
    for product in search_result:
        result.append(product_dict_form(product))
    return result

def show_product_details(token, product_id):
    u_id = token_to_id(token)
    # check valid user
    users = User.query.filter(User.user_id==u_id).all()
    if (len(users) == 0):
        raise ErrorMessage(Error.query.filter(Error.error_id == 2).first().error_name)
    # check valid product
    products = Product.query.filter(Product.product_id==product_id).all()
    if len(products) == 0:
        raise ErrorMessage(Error.query.filter(Error.error_id==16).first().error_name)
    target_product = products[0]

    # convert main_image and sub_image string to list
    cover = ast.literal_eval(target_product.main_image)
    photo = ast.literal_eval(target_product.sub_image)
    photo_images = []
    for i in photo:
        cur_image = {'image': i['thumbUrl']}
        photo_images.append(cur_image)

    product_details = {'product_id': target_product.product_id, 'name': target_product.name, 'description': target_product.description,
                    'price': float(target_product.price), 'discount': target_product.discount, 'stock': target_product.stock, 'status': target_product.status,
                    'main_image': cover[0]['thumbUrl'], 'sub_image': photo_images, 'rate': float(target_product.rate),
                    'comment': target_product.comment, 'type': get_type(target_product)}

    return product_details

def buy_now(token, product_id, quantity):
    u_id = token_to_id(token)
    # check valid user
    users = User.query.filter(User.user_id==u_id).all()
    if len(users) == 0:
        raise ErrorMessage(Error.query.filter(Error.error_id == 17).first().error_name)

    target_product = Product.query.filter(Product.product_id==product_id).first()
    cover = ast.literal_eval(target_product.main_image)
    target_product_info = {
        'product_id': target_product.product_id,
        'name': target_product.name,
        'description': target_product.description,
        'main_image': cover[0]['thumbUrl'],
        'current_price': float(target_product.price) * float(target_product.discount) * (0.01),
        'quantity': quantity,
    }
    original_price = float(target_product.price) * float(quantity)
    total_discount = float(target_product.discount * (0.01) * original_price)
    actual_transaction = float(original_price - total_discount)
    output = {
        'checkout_product': target_product_info,
        'original_price': format(original_price, '.2f'),
        'total_discount': format(total_discount, '.2f'),
        'actual_transaction': format(actual_transaction, '.2f')
    }
    return output

def show_product_rate_comment(product_id):
    # check valid product
    products = Product.query.filter(Product.product_id==product_id).all()
    if len(products) == 0:
        raise ErrorMessage(Error.query.filter(Error.error_id==16).first().error_name)
    target_product = products[0]

    orders = Order_detail.query.filter(Order_detail.product_id==product_id).all()
    rate_comment_details = []
    for i in orders:
        if i.product_rate != 0:
            target_order = Order.query.filter(Order.order_id==i.order_id).first()
            target_user = User.query.filter(User.user_id==target_order.user_id).first()
            rate_comment_info = {'user_name': target_user.name, 'rate': format(i.product_rate, '.1f'), 'comment': i.product_comment}
            rate_comment_details.append(rate_comment_info)
    output = {
        'overall_rate': format(target_product.rate, '.1f'),
        'rate_comment_details': rate_comment_details
    }
    return output

def customized_homepage(token):
    user_id =  token_to_id(token)
    target_user = User.query.filter(User.user_id==user_id).first()

    output_game_id = []
    output_peripheral_id = []
    output_game = []
    output_peripheral = []
    all_product = Product.query.order_by(Product.rate.desc()).all()

    # 拿到折扣的游戏 id list
    game_on_promote = []
    promote_games = Product.query.filter(Product.status==1, Product.category==0).all()
    for i in promote_games:
        game_on_promote.append(i.product_id)

    # 拿到折扣的周边 id list
    peripheral_on_promote = []
    promote_peripherals = Product.query.filter(Product.status==1, Product.category==1).all()
    for i in promote_peripherals:
        peripheral_on_promote.append(i.product_id)

    # 添加折扣的游戏， 按照rate 排序
    output_game_id.extend(game_on_promote)
    for product in all_product:
        if product.product_id in game_on_promote:
            output_game.append(product_dict_form(product))
    # 添加折扣的周边， 按照rate 排序
    output_peripheral_id.extend(peripheral_on_promote)
    for product in all_product:
        if product.product_id in peripheral_on_promote:
            output_peripheral.append(product_dict_form(product))

    # 兴趣 type id list
    interests_list = []
    for interest_type in target_user.interest:
        interests_list.append(interest_type.type_id)

    game_interest = []
    peripheral_interest = []
    for i in interests_list:
        #拿到兴趣的游戏 id list （没有促销）
        if i <= 7:
            interest_games = Product.query.join(Type, Product.genre).filter(Product.status==0, Type.type_id==i).all()
            for product in interest_games:
                if product.product_id not in game_interest:
                    game_interest.append(product.product_id)
        #拿到兴趣的周边 id list （没有促销）
        else:
            interest_peripherals = Product.query.join(Type, Product.genre).filter(Product.status==0, Type.type_id==i).all()
            for product in interest_peripherals:
                if product.product_id not in peripheral_interest:
                    peripheral_interest.append(product.product_id)

    # 随机选取 1/4个感兴趣的游戏和周边
    random_game_interest = random.sample(game_interest, int(len(game_interest)/4))
    random_peripheral_interest = random.sample(peripheral_interest, int(len(peripheral_interest)/4))
    # 添加折扣的游戏， 按照rate 排序
    output_game_id.extend(random_game_interest)
    for product in all_product:
        if product.product_id in random_game_interest:
            output_game.append(product_dict_form(product))
    # 添加折扣的周边， 按照rate 排序
    output_peripheral_id.extend(random_peripheral_interest)
    for product in all_product:
        if product.product_id in random_peripheral_interest:
            output_peripheral.append(product_dict_form(product))

    rest_game = []
    rest_peripheral = []
    #拿到所有未添加的游戏（没有促销）
    all_games = Product.query.filter(Product.status==0, Product.category==0).all()
    for product in all_games:
        if product.product_id not in output_game_id:
            rest_game.append(product.product_id)

    #拿到所有未添加的周边（没有促销）
    all_peripherals = Product.query.filter(Product.status==0, Product.category==1).all()
    for product in all_peripherals:
        if product.product_id not in output_peripheral_id:
            rest_peripheral.append(product.product_id)

    # 添加剩余的游戏， 按照rate 排序
    output_game_id.extend(rest_game)
    for product in all_product:
        if product.product_id in rest_game:
            output_game.append(product_dict_form(product))
    # 添加剩余的周边， 按照rate 排序
    output_peripheral_id.extend(rest_peripheral)
    for product in all_product:
        if product.product_id in rest_peripheral:
            output_peripheral.append(product_dict_form(product))

    print(len(output_game))
    return {'game': output_game, 'peripheral': output_peripheral}

if __name__ == "__main__":
    #db.create_all()
    token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjE3fQ.12Gqt0B29VWffPR7Fp6qjWhNa2jsgU21Ns6uZh6Ihto"
    # result = show_product_rate_comment(3)
    #     # result = search('grand')
    #     pprint.pprint(result)
    #res = search('pubg')
    # print(res)
    res = customized_homepage(token)
    print(res)
    #list = [1,3,4,6,8,11,23,7,12]
    #a = [1,1,1,1]
    #print(random.sample(list, int(len(list)/2)))
    #list.extend(a)
    #print(list)
    #print(Product.query.filter(Product.status==1).all())