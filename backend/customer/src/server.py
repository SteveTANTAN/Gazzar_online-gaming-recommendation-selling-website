from flask import Blueprint, request
from json import dumps
from flask import Flask, request
from flask_cors import CORS
import json
import ast

import sys
sys.path.append('../../database/src')
from database import db

from auth import user_register, user_login, user_logout, forget_password, edit_password, show_user_profile, show_user_order, add_interest, edit_username
from customer_product import search, show_product_details, buy_now, show_product_rate_comment, customized_homepage, surprise_store
from cart_operation import add_to_cart, show_cart_products, edit_checked_product, delete_cart_product, checkout, notify_quantity, show_user_cart
from payment_operation import show_user_payment, add_payment, delete_payment

sys.path.append('../../admin/src')
from manager import add_admin, admin_login, admin_logout, show_all_admins, delete_admin
from product_manage import add_product, edit_product, get_product, get_product_all, delete_product
from admin_search import admin_search
from admin_order_management import order_search, get_order_all
def defaultHandler(err):
    """server"""
    response = err.get_response()
    print('response', err, err.get_response())
    response.data = dumps({
        "code": err.code,
        "name": "System Error",
        "message": err.get_description(),
    })
    response.content_type = 'application/json'
    return response

APP = Flask(__name__)
CORS(APP)
APP.config['TRAP_HTTP_EXCEPTIONS'] = True
APP.register_error_handler(Exception, defaultHandler)

#############################################################################################
#############################################################################################
######
######          USER FLASK
######
#############################################################################################
#############################################################################################
@APP.route('/api/user/register', methods = ['POST'])
def register_user():
    """Registers a new user"""
    info = request.get_json()
    email = info['email']
    password = info['password']
    name = info['name']
    age = info['age']
    gender = info['gender']
    result = user_register(email, password, name, age, gender)
    return dumps(result)

@APP.route('/api/user/login', methods = ['POST'])
def login_user():
    """Login a new user"""
    info = request.get_json()
    email = info['email']
    password = info['password']
    result = user_login(email, password)
    return dumps(result)

@APP.route('/api/user/logout', methods = ['POST'])
def logout_user():
    """Logout a new user"""
    info = request.get_json()
    token = info['token']
    result = user_logout(token)
    return dumps(result)

@APP.route('/api/user/forget/password', methods = ['POST'])
def password_forget():
    """user forget password"""
    info = request.get_json()
    email = info['email']
    result = forget_password(email)
    return dumps(result)

@APP.route('/api/user/edit/password', methods = ['PUT'])
def password_edit():
    """user edit password"""
    info = request.get_json()
    token = info['token']
    password = info['password']
    result = edit_password(token, password)
    return dumps(result)

@APP.route('/api/user/profile/<token>', methods=['GET'])
def show_profile(token):
    '''
    Route for listing profile
    '''
    return dumps(show_user_profile(token))

@APP.route('/api/user/edit/username', methods = ['PUT'])
def username_edit():
    """user edit username"""
    info = request.get_json()
    token = info['token']
    name = info['name']
    result = edit_username(token, name)
    return dumps(result)

@APP.route('/api/user/add/interest', methods=['POST'])
def add_user_interest():
    '''
    Route for add interest for cur user
    '''
    info = request.get_json()
    token = info['token']
    interest_dict = info['interest_dict']
    return dumps(add_interest(token, interest_dict))

@APP.route('/api/user/customized/homepage/<token>', methods=['GET'])
def show_customized_homepage(token):
    '''
    Route for current user's customized homepage
    '''
    return dumps(customized_homepage(token))

@APP.route('/api/user/surprise/store/<token>', methods=['GET'])
def show_surprise_store(token):
    '''
    Route for current user's surprise_store
    '''
    return dumps(surprise_store(token))

@APP.route('/api/user/order/<token>', methods=['GET'])
def show_order(token):
    '''
    Route for current user's order count
    '''
    return dumps(show_user_order(token))

@APP.route('/api/user/show/payment/<token>', methods=['GET'])
def show_payment(token):
    '''
    Route for current user's payment count
    '''
    return dumps(show_user_payment(token))

@APP.route('/api/user/add/payment', methods=['POST'])
def add_user_payment():
    '''
    Route for add new payment option for cur user
    '''
    info = request.get_json()
    token = info['token']
    payment_dict = info['payment_dict']
    return dumps(add_payment(token, payment_dict))

@APP.route('/api/user/delete/payment', methods=['DELETE'])
def delete_user_payment():
    '''
    Route for delete payment option for cur user
    '''
    info = request.get_json()
    token = info['token']
    payment_detail_id = info['payment_detail_id']
    return dumps(delete_payment(token, payment_detail_id))

@APP.route('/api/user/show/<product_id>/<token>', methods=['GET'])
def product_details_show(token, product_id):
    '''
    Route for show product details
    '''
    return dumps(show_product_details(token, product_id))

@APP.route('/api/user/search/<str>', methods=['GET'])
def search_product(str):
    '''
    Route for search product with given string
    '''
    return dumps(search(str))

@APP.route('/api/user/buynow/<product_id>/<quantity>/<token>', methods=['GET'])
def buy_product_now(token, product_id, quantity):
    '''
    Route for buy product now
    '''
    return dumps(buy_now(token, product_id, quantity))

@APP.route('/api/user/show/rate/comment/<product_id>', methods=['GET'])
def show_rate_comment(product_id):
    '''
    Route for show product rate and comments
    '''
    return dumps(show_product_rate_comment(product_id))

@APP.route('/api/user/cart/<token>', methods=['GET'])
def show_cart(token):
    '''
    Route for current user's cart count
    '''
    return dumps(show_user_cart(token))

@APP.route('/api/user/add/cart', methods=['POST'])
def add_product_to_cart():
    '''
    Route for add prodcut to cart
    '''
    info = request.get_json()
    token = info['token']
    product_id = info['product_id']
    quantity = info['quantity']
    return dumps(add_to_cart(token, product_id, quantity))

@APP.route('/api/user/show/cart/<token>', methods=['GET'])
def show_cart_product_info(token):
    '''
    Route for show cart products info
    '''
    return dumps(show_cart_products(token))

@APP.route('/api/user/edit/checked', methods=['PUT'])
def edit_cart_checked_status():
    '''
    Route for edit cart checked status
    '''
    info = request.get_json()
    token = info['token']
    cart_id = info['cart_id']
    checked = info['checked']
    return dumps(edit_checked_product(token, cart_id, checked))

@APP.route('/api/user/checkout/cart/<token>', methods=['GET'])
def checkout_cart(token):
    '''
    Route for checkout all cart checked products
    '''
    return dumps(checkout(token))

@APP.route('/api/user/notify/quantity', methods=['PUT'])
def notify_cart_quantity():
    '''
    Route for notify cart product quantity
    '''
    info = request.get_json()
    token = info['token']
    cart_id = info['cart_id']
    quantity = info['quantity']
    return dumps(notify_quantity(token, cart_id, quantity))

@APP.route('/api/user/delete/cart', methods=['DELETE'])
def delete_cart():
    '''
    Route for delete cart
    '''
    info = request.get_json()
    token = info['token']
    cart_id = info['cart_id']
    return dumps(delete_cart_product(token, cart_id))

#############################################################################################
#############################################################################################
######
######          ADMIN FLASK
######
#############################################################################################
#############################################################################################
@APP.route('/api/admin/add', methods = ['POST'])
def admin_add():
    """Registers a new user."""
    info = request.get_json()
    token = info['token']
    email = info['email']
    password = info['password']

    result = add_admin(token, email, password)
    return dumps(result)

@APP.route('/api/admin/login', methods = ['POST'])
def login_admin():
    """Registers a new user."""
    info = request.get_json()
    email = info['email']
    password = info['password']

    result = admin_login(email, password)
    return dumps(result)


@APP.route('/api/admin/logout', methods = ['POST'])
def logout_admin():
    """Login a new user."""
    info = request.get_json()
    token = info['token']
    result = admin_logout(token)
    return dumps(result)

@APP.route('/api/admin/profile/<token>', methods=['GET'])
def show_admin_profile(token):
    '''
    Route for listing profile
    '''
    # print(token)
    # info = request.get_json()
    # token = info['token']
    return dumps(show_all_admins(token))

@APP.route('/api/admin/delete', methods=['DELETE'])
def target_admin_delete():
    '''
    Route for listing profile
    '''
    # print(token)
    info = request.get_json()
    token = info['token']
    email = info['email']
    return dumps(delete_admin(token, email))

@APP.route('/api/add/games', methods=['PUT'])
def games_add():
    '''
    Route for listing profile
    '''
    # print(token)
    info = request.get_json()
    token = info['token']
    product_dict = info['product_dict']
    #print(json.loads(product_dict))
    return dumps(add_product(token, product_dict, 0))

@APP.route('/api/add/peripherals', methods=['PUT'])
def peripherals_add():
    '''
    Route for listing profile
    '''
    # print(token)
    info = request.get_json()
    token = info['token']
    product_dict = info['product_dict']
    return dumps(add_product(token, product_dict, 1))

@APP.route('/api/edit/products', methods=['PUT'])
def games_edit():
    '''
    Route for listing profile
    '''
    # print(token)
    info = request.get_json()
    token = info['token']
    product_dict = info['product_dict']
    return dumps(edit_product(token, product_dict))

@APP.route('/api/get/product/<token>/<product_id>', methods=['GET'])
def product_get(token, product_id):
    '''
    Route for listing profile
    '''
    # print(token)
    return dumps(get_product(token, product_id))

@APP.route('/api/get/product/all/<product_category>/<token>', methods=['GET'])
def product_get_all(token, product_category):
    '''
    Route for listing profile
    '''
    # print(token)
    return dumps(get_product_all(token, product_category))

@APP.route('/api/delete/product', methods=['DELETE'])
def target_product_delete():
    '''
    Route for listing profile
    '''
    # print(token)
    info = request.get_json()
    token = info['token']
    product_id = info['product_id']
    return dumps(delete_product(token, product_id))

@APP.route('/api/admin/search/<token>/<search_text>/<category>', methods=['GET'])
def target_product_search(token, search_text, category):
    '''
    Route for listing profile
    '''
    # print(token)
    return dumps(admin_search(token, search_text, category))

@APP.route('/api/admin/order/search/<search_text>/<value>', methods=['GET'])
def target_order_search(search_text, value):
    '''
    Route for listing profile
    '''
    # print(token)
    return dumps(order_search(search_text, value))

@APP.route('/api/get/order/all/<token>', methods=['GET'])
def order_get_all(token):
    '''
    Route for listing profile
    '''
    # print(token)
    return dumps(get_order_all(token))

if __name__ == "__main__":
    db.create_all()
    APP.run(port=55467, host="0.0.0.0") # Do not edit this port
