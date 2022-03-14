import sys
sys.path.append('../../database/src')
from database import db
from time import sleep
from flask import Blueprint, request, jsonify
from json import dumps
from flask import Flask, request, send_from_directory
from flask_cors import CORS
#import requests

#from auth import user_register
from search_filter import search, filter
from auth import user_register

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


@APP.route('/auth/register', methods = ['POST'])
def register_user():
    """Registers a new user."""
    info = request.get_json()
    email = info['email']
    password = info['password']
    name = info['name']
    age = info['age']
    gender = info['gender']
    #interest = info['interest']

    result = user_register(email, password, name, age, gender)
    return dumps(result)


# @APP.route('/user/search', methods = ['POST'])
# def search_product():
#     """search product with given string (match in product name and detail)"""
#     info = request.get_json()
#     str = info["str"]
#     result = search(str)
#     return dumps(result)



if __name__ == "__main__":
    db.create_all()
    APP.run(port=5000) # Do not edit this port
