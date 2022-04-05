"""
customer_product.py is used for customer product-relevant operation
This file will include the search, show_product_details
"""
from cgitb import reset
from re import A
from tabnanny import check
from time import strftime
from unittest import result

import sys
sys.path.append('../../database/src')
from database import db
from product import Product
from type import Type
from user import User
from cart import Cart
from json import dumps
from error import Error
from order_detail import Order_detail
from order import Order

from sqlalchemy import or_,and_
from help import token_to_id, ErrorMessage, product_dict_form, get_type
import ast
import pprint
import random
import time
import datetime as dt

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
    images = ast.literal_eval(target_product.main_image)
    photo = ast.literal_eval(target_product.sub_image)
    images.extend(photo)

    product_details = {'product_id': target_product.product_id, 'name': target_product.name, 'description': target_product.description,
                    'price': float(target_product.price), 'discount': target_product.discount, 'stock': target_product.stock, 'status': target_product.status,
                    'main_image': images, 'rate': float(target_product.rate), 'comment': target_product.comment, 'type': get_type(target_product)}

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
        'current_price': format(float(target_product.price) * float(100 - target_product.discount) * (0.01), '.2f'),
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

    # 拿到折扣的游戏 id list
    # 拿到折扣的周边 id list
    game_on_promote = []
    peripheral_on_promote = []
    promote = Product.query.filter(Product.status==1).all()
    for i in promote:
        if i.category == 0:
            game_on_promote.append(i.product_id)
        else:
            peripheral_on_promote.append(i.product_id)

    # 添加折扣的游戏
    # 添加折扣的周边
    random.shuffle(game_on_promote)
    random.shuffle(peripheral_on_promote)
    output_game_id.extend(game_on_promote)
    output_peripheral_id.extend(peripheral_on_promote)

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
                if (product.product_id not in game_interest) and (product.product_id not in output_game_id):
                    game_interest.append(product.product_id)
        #拿到兴趣的周边 id list （没有促销）
        else:
            interest_peripherals = Product.query.join(Type, Product.genre).filter(Product.status==0, Type.type_id==i).all()
            for product in interest_peripherals:
                if (product.product_id not in peripheral_interest) and (product.product_id not in output_peripheral_id):
                    peripheral_interest.append(product.product_id)

    # 随机选取 1/4个感兴趣的游戏和周边
    random_game_interest = random.sample(game_interest, int(len(game_interest)/4))
    random_peripheral_interest = random.sample(peripheral_interest, int(len(peripheral_interest)/4))
    # 添加折扣的游戏
    # 添加折扣的周边
    output_game_id.extend(random_game_interest)
    output_peripheral_id.extend(random_peripheral_interest)


    rest_game = []
    rest_peripheral = []
    #拿到所有未添加的游戏（没有促销）
    #拿到所有未添加的周边（没有促销）
    all_gam_per = Product.query.filter(Product.status==0).all()
    for product in all_gam_per:
        if product.category == 0:
            if product.product_id not in output_game_id:
                rest_game.append(product.product_id)
        else:
            if product.product_id not in output_peripheral_id:
                rest_peripheral.append(product.product_id)

    # 添加剩余的游戏
    # 添加剩余的周边
    random.shuffle(rest_game)
    random.shuffle(rest_peripheral)
    output_game_id.extend(rest_game)
    output_peripheral_id.extend(rest_peripheral)


    for i in output_game_id:
        product = Product.query.filter(Product.product_id==i).first()
        output_game.append(product_dict_form(product))

    for i in output_peripheral_id:
        product = Product.query.filter(Product.product_id==i).first()
        output_peripheral.append(product_dict_form(product))

    #print(interest_games)
    return {'game': output_game, 'peripheral': output_peripheral}#, 'count':output_game_id}


def surprise_store(token):
    user_id =  token_to_id(token)
    target_user = User.query.filter(User.user_id==user_id).first()

    check = 0
    output = []
    # 专属折扣
    if target_user.surprise_discount == 0:
        target_user.surprise_discount = random.randint(1, 40)
        target_user.surprise_timer = time.strftime('%Y-%m-%d', time.localtime())
        db.session.commit()
        check = 1
    else:
        # 折扣时效，惊喜商品时效
        current_time = time.strftime('%Y-%m-%d', time.localtime())
        date1 = dt.datetime.strptime(current_time, '%Y-%m-%d').date()
        date2 = dt.datetime.strptime(target_user.surprise_timer, '%Y-%m-%d').date()
        diff_day = (date1 - date2).days
        if diff_day > 7:
            target_user.surprise_discount = random.randint(1, 40)
            target_user.surprise_timer = current_time
            db.session.commit()
            check = 1
        else:
            for i in ast.literal_eval(target_user.surprise_product):
                product = Product.query.filter(Product.product_id==i).first()
                output.append(product_dict_form(product))

    # 生成折扣商品
    # 促销
    if check == 1:
        output_id_list = []
        game_on_promote = []
        peripheral_on_promote = []
        promote = Product.query.filter(Product.status==1).all()
        for i in promote:
            if i.category == 0:
                game_on_promote.append(i.product_id)
            else:
                peripheral_on_promote.append(i.product_id)

        if len(game_on_promote) > 1:
            double_discount_game = random.sample(game_on_promote, 1)
        else:
            double_discount_game = random.sample(game_on_promote, len(game_on_promote))
        if len(peripheral_on_promote) > 1:
            double_discount_peripheral = random.sample(peripheral_on_promote, 1)
        else:
            double_discount_peripheral = random.sample(peripheral_on_promote, len(peripheral_on_promote))
        output_id_list.extend(double_discount_game)
        output_id_list.extend(double_discount_peripheral)

        # 购物车
        cart_list = []
        target_cart = Cart.query.filter(Cart.user_id==target_user.user_id).all()
        for i in target_cart:
            cart_list.append(i.product_id)
        if len(cart_list) > 2:
            discount_cart_product = random.sample(cart_list, 2)
        else:
            discount_cart_product = random.sample(cart_list, len(cart_list))
        output_id_list.extend(discount_cart_product)

        # 兴趣
        interests_list = []
        for interest_type in target_user.interest:
            interests_list.append(interest_type.type_id)

        interest = []
        for i in interests_list:
            interest_products = Product.query.join(Type, Product.genre).filter(Product.status==0, Type.type_id==i).all()
            for product in interest_products:
                if product.product_id not in interest:
                    interest.append(product.product_id)

        rest= []
        #拿到所有未添加的游戏（没有促销）
        all_gam_per = Product.query.filter(Product.status==0).all()
        for product in all_gam_per:
            if product.product_id not in output_id_list:
                rest.append(product.product_id)


        # 随机选取 感兴趣的游戏和周边
        if len(output_id_list) == 0 and len(interest) >= 8:
            random_game_interest = random.sample(interest, 8)
        elif len(output_id_list) != 0 and len(interest) > 8:
            random_game_interest = random.sample(interest, 8 - len(output_id_list))
        elif len(output_id_list) != 0 and (len(output_id_list) + len(interest)) <= 8:
            random_game_interest = random.sample(interest, len(interest))
            random_game_interest = random.sample(rest, 8 - len(output_id_list))
        else:
            random_game_interest = random.sample(rest, 8 - len(output_id_list))
        output_id_list.extend(random_game_interest)

        # 生成输出
        for i in output_id_list:
            product = Product.query.filter(Product.product_id==i).first()
            output.append(product_dict_form(product))

        # 存储用户 折扣商品 id
        target_user.surprise_product = '[' + ','.join(list(map(str, output_id_list))) + ']'
        db.session.commit()

    return {'surprise_discount': target_user.surprise_discount, 'surprise_product': output}


if __name__ == "__main__":
    #     #db.create_all()
    token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjE3fQ.12Gqt0B29VWffPR7Fp6qjWhNa2jsgU21Ns6uZh6Ihto"
    # print(res)
    #a= time.strftime('%Y-%m-%d', time.localtime())
    # output_id_list = [1,2,3,4,5,6,7,8]
    # a = '[' + ','.join(list(map(str, output_id_list))) + ']'
    # print(a)
    # b=ast.literal_eval(a)
    # print(type(b))
    res = surprise_store(token)
    #res = customized_homepage(token)
    #all_product = Product.query.order_by(Product.rate.desc()).all()
    # for i in all_product:
    #     print(i.product_id)
    print(res)