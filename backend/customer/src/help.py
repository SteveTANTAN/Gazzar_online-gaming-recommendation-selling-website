"""
helper function for user
"""
import sys

from order_detail import Order_detail
sys.path.append('../../database/src')

from database import db
from user import User
from type import Type
from error import Error
import jwt
import re
import datetime
import random
import string

from werkzeug.exceptions import HTTPException
def create_uid():
    """
    This function is used to create a user id(uid)
    return valid user id
    """
    # get all uid
    all_uid = db.session.query(User.user_id).all()
    #generate len(uid) + 1
    return ((all_uid[-1][0]) + 1 )

def create_oid():
    """
    This function is used to create a user id(uid)
    return valid user id
    """
    return ''.join(str(random.choice(range(10))) for _ in range(10))

def create_cdk():
    string_len = 5
    letters = string.ascii_uppercase + string.digits
    cdk = ''
    for i in range(4):
        head = ''.join(random.choice(letters) for k in range(string_len))
        if cdk != '':
            cdk = cdk + '-' + head
        else:
            cdk = head
    return cdk


def create_token(uid):
    '''
    This function will generate token
    input: user id
    return: encoded token
    '''
    SECRET = 'THREEDAYSTOSEE'

    encoded_jwt = jwt.encode({'uid': uid}, SECRET, algorithm='HS256')

    return str(encoded_jwt)

def get_error_info(error_id):
    '''
    This function will raise error from datebase
    input: error_id
    return: error name
    '''
    errors = db.session.query(Error).all()
    for row in errors:
        if row.error_id == error_id: return row.error_name

def add_to_database(data):
    """
    This function is used for adding data to database
    input: data need to update
    """
    db.session.add(data)
    db.session.commit()

def check_email(email):
    '''
    This function will check the email valid or not
    input: email
    return: check result
    '''
    regex = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$"
    # pass the regular expression
    # and the string in search() method
    if(re.search(regex, email)):
        return True
    return False

def check_password(password):
    '''
    This function will check the password valid or not
    obey the next rules:
        - The password must be 8-15 characters — Error 005
        - The password must contain at least one character from each of the following groups:
            lower case alphabet, uppercase alphabet, numeric, special characters
    input: password
    return: check result
    '''
    regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}"
    # pass the regular expression
    # and the string in search() method
    if(re.search(regex, password)):
        return True
    return False

def token_to_id(token):
    '''
    This function will convert token to id
    input: token
    return: check result
    '''
    users = User.query.all()
    for i in users:
        if i.token == token:
            return i.user_id
    return False

class ErrorMessage(HTTPException):
    """Input/Access Error"""
    code = 400
    message = 'No message specified'

# if __name__ == "__main__":
#     print(token_to_id("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjF9.zf40wtVW374ygpDOvfCMhBfnLrddY2Y9C6IlDmzwxy4"))