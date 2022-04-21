"""
lotter.py is used for customer lottery operation
"""

import sys
sys.path.append('../../database/src')
from database import db
from product import Product
from type import Type
from user import User
from cart import Cart
from error import Error
from order_detail import Order_detail
from order import Order
from user_order import user_order_add
from help import token_to_id, ErrorMessage, product_dict_form, create_cdk, add_to_database
import random
import datetime as dt
import ast
def user_lottery(token):
    user_id =  token_to_id(token)
    target_user = User.query.filter(User.user_id==user_id).first()

    output = []

    # form lottery product
    output_id_list = []
    game_on_promote = []
    peripheral_on_promote = []
    promote = Product.query.filter(Product.status==1, Product.stock>=1).all()
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

    # form product list from cart
    cart_list = []
    target_cart = Cart.query.filter(Cart.user_id==target_user.user_id).all()
    for i in target_cart:
        cart_list.append(i.product_id)
    if len(cart_list) > 2:
        discount_cart_product = random.sample(cart_list, 2)
    else:
        discount_cart_product = random.sample(cart_list, len(cart_list))
    output_id_list.extend(discount_cart_product)

    # form product list from interest
    interests_list = []
    for interest_type in target_user.interest:
        interests_list.append(interest_type.type_id)

    interest = []
    for i in interests_list:
        interest_products = Product.query.join(Type, Product.genre).filter(Product.status==0, Type.type_id==i, Product.stock>=1).all()
        for product in interest_products:
            if product.product_id not in interest:
                interest.append(product.product_id)

    rest= []
    # get all no added product
    all_gam_per = Product.query.filter(Product.status==0, Product.stock>=1).all()
    for product in all_gam_per:
        if product.product_id not in output_id_list:
            rest.append(product.product_id)


    # random pick product
    if len(output_id_list) == 0 and len(interest) >= 9:
        random_game_interest = random.sample(interest, 9)
    elif len(output_id_list) != 0 and len(interest) > 9:
        random_game_interest = random.sample(interest, 9 - len(output_id_list))
    elif len(output_id_list) != 0 and (len(output_id_list) + len(interest)) <= 9:
        random_game_interest = random.sample(interest, len(interest))
        random_game_interest = random.sample(rest, 9 - len(output_id_list))
    else:
        random_game_interest = random.sample(rest, 9 - len(output_id_list))
    output_id_list.extend(random_game_interest)

    # form output
    for i in output_id_list:
        product = Product.query.filter(Product.product_id==i).first()
        output.append(product_dict_form(product))

    # store surprise product
    target_user.surprise_product = '[' + ','.join(list(map(str, output_id_list))) + ']'
    db.session.commit()

    return output

def lottery_order(token, product_id):
    user_id =  token_to_id(token)
    target_user = User.query.filter(User.user_id==user_id).first()
    target_product = Product.query.filter(Product.product_id==product_id).first()

    all_order_id = Order.query.all()
    if len(all_order_id) != 0:
        k = 0
        for i in all_order_id:
            if (i.order_id > k): k = i.order_id
        order_id = k + 1
    else:
        order_id = 1

    order = Order(order_id, target_user)
    add_to_database(order)


    all_order_detail_id = Order_detail.query.all()
    if len(all_order_detail_id) != 0:
        order_detail_id = (all_order_detail_id[-1].order_detail_id) + 1
    else:
        order_detail_id = 1
    create_time= dt.datetime.now()
    cdkey = create_cdk()
    order_detail= Order_detail(order_detail_id, 1, create_time, cdkey, order_id, product_id, target_product.name,
            target_product.description, 0, 100, target_product.main_image, target_product.rate, target_product.comment)
    add_to_database(order_detail)

    target_product.stock = target_product.stock - 1
    db.session.commit()
    return


if __name__ == "__main__":
    #     #db.create_all()
    token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjB9.iQfXIXBl6UUzeise2YrpHK43XimDKNSu6iCE7NKtB5w"
    #res = user_lottery(token)
    #print(res)
    lottery_order(token, 6)