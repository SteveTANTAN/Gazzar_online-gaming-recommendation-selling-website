"""
...
"""
from database import Session, engine, Base
import string
import random
import jwt
from user import User
from error import Error

def create_uid():
    """
    This function is used to create a user id(uid)
    """
    # Connect to AWS database
    session = Session()
    # get all uid
    all_uid = session.query(User.uid).all()
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
    session = Session()
    errors = session.query(Error).all()
    for row in errors:
        if row.error_id == error_id: return row.error_name

def add_to_database(session, data):
    """
    This function is used for adding data to database
    """
    session.add(data)
    session.commit()
    session.close()

# if __name__ == "__main__":
#     print(get_error_info(1))
