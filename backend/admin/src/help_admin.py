"""
helper function for admin
"""
import sys

from pip import main
sys.path.append('../../database/src')

from database import db
from admin import Admin
from error import Error
import jwt
import re

def create_admin_id():
    """
    This function is used to create a user id(uid)
    return valid admin id
    """
    # get all admin_id
    all_admin_id = db.session.query(Admin.admin_id).all()
    #generate len(admin_id) + 1
    return ((all_admin_id[-1][0]) + 1 )

def create_token(admin_id):
    '''
    This function will generate token
    input: admin_id
    return: encoded token
    '''
    SECRET = 'ADMINTHREEDAYSTOSEE'

    encoded_jwt = jwt.encode({'admin_id': admin_id}, SECRET, algorithm='HS256')

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
            lower case alphabet, uppercase alphabet, numeric, special characters\
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
    admins = Admin.query.all()
    for i in admins:
        if i.token == token:
            return i.admin_id
    return False

def admin_status(token):
    '''
    This function will return admin status
    input: token
    return: check result
    '''
    admin_id = token_to_id(token)
    super_admin = Admin.query.filter(Admin.admin_id==admin_id).all()[0]
    if (super_admin.status == 1): return True
    return False


if __name__ == "__main__":
    create_admin_id()
