"""
auth.py is used for authentication
This file will include the user_register
"""
import sys

sys.path.append('../../database/src')

from database import db
from product import Product
# def user_register(email, password, name, age, gender):
#     """
#     This function is used for register user and store to the database->user table
#     input: email, password, name, age, gender
#     return: token
#     """
#     # Connect to AWS database
#     session = Session()
#     # error handler
#     # 
#     # 
#     # 

#     # creat a unique uid for the user
#     uid = create_uid()
#     # create token for the users
#     token = create_token(uid)
#     # input User infomation
#     user = User(token, uid, name, age, gender, email, password)
#     # add data to databse
#     add_to_database(session, user)

#     return token

# def user_login(emial, password):
#     """
#     """
# def show_product():
#     all_products = db.session().query(Product).all()
#     for p in all_products:
#         print(f'{p.name}')

# if __name__ == "__main__":
#     # show_product()
#     print(1)

