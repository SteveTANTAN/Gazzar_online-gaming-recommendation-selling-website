"""
...
"""
import sys

sys.path.append('../../database/src')

from database import db
from product import Product
from admin import Admin
from error import Error
import string
import random
import jwt
import re

def create_admin_id():
    """
    This function is used to create a user id(uid)
    """
    # get all admin_id
    all_admin_id = db.session.query(Admin.admin_id).all()
    #generate len(admin_id) + 1
    return len(all_admin_id) + 1

def create_token(admin_id):
    '''
    This function will generate token
    '''
    SECRET = 'ADMINTHREEDAYSTOSEE'

    encoded_jwt = jwt.encode({'admin_id': admin_id}, SECRET, algorithm='HS256')

    return str(encoded_jwt)

def get_error_info(error_id):
    errors = db.session.query(Error).all()
    for row in errors:
        if row.error_id == error_id: return row.error_name

def add_to_database(data):
    """
    This function is used for adding data to database
    """
    db.session.add(data)
    db.session.commit()

'''
This code is copied from
https://www.geeksforgeeks.org/check-if-email-address-valid-or-not-in-python/
for checking whether the email is valid
'''
# Python program to validate an Email

def check_email(email):
    '''
    Define a function for
    for validating an Email
    '''
    regex = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$"
    # pass the regualar expression
    # and the string in search() method
    if(re.search(regex, email)):
        return True
    return False

def check_password(password):
    '''
    Define a function for
    for validating an Email
    '''
    regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}"
    # pass the regualar expression
    # and the string in search() method
    if(re.search(regex, password)):
        return True
    return False

def admin_is_superadmin(token):
    admins_email = Admin.query.filter(Admin.token==token).all()[0]
    if (admin_email.status == 1) return True
    return False
# def get_all_user_info():
# if __name__ == "__main__":
#     print(check_password("fghajGgfg@1ahjkdf"))
