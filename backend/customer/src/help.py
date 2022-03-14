"""
...
"""
import sys

sys.path.append('../../database/src')

from database import db
from product import Product
from user import User
from error import Error
import string
import random
import jwt
import re
def create_uid():
    """
    This function is used to create a user id(uid)
    """
    # get all uid
    all_uid = db.session.query(User.user_id).all()
    #generate len(uid) + 1
    return len(all_uid) + 1

def create_token(uid):
    '''
    This function will generate token
    '''
    SECRET = 'THREEDAYSTOSEE'

    encoded_jwt = jwt.encode({'uid': uid}, SECRET, algorithm='HS256')

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


# def get_all_user_info():
# if __name__ == "__main__":
#     create_uid()
