from flask import Blueprint, request, jsonify
from json import dumps
from flask import Flask, request, send_from_directory
from flask_cors import CORS
import requests
import sys 
sys.path.append('../../database/src') 
from database import db 
from auth import user_register, user_login, user_logout, forget_password, edit_password, show_user_profile

def defaultHandler(err):
    """
    server
    """
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
    """Registers a new user."""
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
    """Login a new user."""
    info = request.get_json()
    email = info['email']
    password = info['password']

    result = user_login(email, password)
    return dumps(result)

@APP.route('/api/user/logout', methods = ['POST'])
def logout_user():
    """Login a new user."""
    info = request.get_json()
    user_id = info['user_id']
    result = user_logout(user_id)
    return dumps(result)

@APP.route('/api/user/forget/password', methods = ['POST'])
def password_forget():
    """Login a new user."""
    info = request.get_json()
    user_id = info['user_id']
    result = forget_password(user_id)
    return dumps(result)

@APP.route('/api/user/edit/password', methods = ['PUT'])
def password_edit():
    """Login a new user."""
    info = request.get_json()
    user_id = info['user_id']
    password = info['password']
    result = edit_password(user_id, password)
    return dumps(result)

@APP.route('/api/user/profile/<token>', methods=['GET'])
def show_profile(token):
    '''
    Route for listing profile
    '''
    print(token)
    return dumps(show_user_profile(token))

if __name__ == "__main__":
    db.create_all()
    APP.run(port=55467) # Do not edit this port
