from flask import Blueprint, request
from json import dumps
from flask import Flask, request
from flask_cors import CORS
import json
import ast

import sys
sys.path.append('../../database/src')
from database import db

from auth import user_register, user_login, user_logout, forget_password, edit_password, show_user_profile, show_user_payment, show_user_cart, show_user_order

sys.path.append('../../admin/src')
from manager import add_admin, admin_login, admin_logout, show_all_admins, delete_admin
from product_manage import add_product, edit_product, get_product, get_product_all, delete_product
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
    # print(token)
    # info = request.get_json()
    # token = info['token']
    return dumps(show_user_profile(token))

@APP.route('/api/user/payment/<token>', methods=['GET'])
def show_payment(token):
    '''
    Route for listing profile
    '''
    # print(token)
    # info = request.get_json()
    # token = info['token']
    return dumps(show_user_payment(token))

@APP.route('/api/user/order/<token>', methods=['GET'])
def show_order(token):
    '''
    Route for listing profile
    '''
    # print(token)
    # info = request.get_json()
    # token = info['token']
    return dumps(show_user_order(token))

@APP.route('/api/user/cart/<token>', methods=['GET'])
def show_cart(token):
    '''
    Route for listing profile
    '''
    # print(token)
    # info = request.get_json()
    # token = info['token']
    return dumps(show_user_cart(token))

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

if __name__ == "__main__":
    db.create_all()
    APP.run(port=55467) # Do not edit this port
