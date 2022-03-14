"""
auth.py is used for authentication
This file will include the user_register
"""
import email
from pickle import NONE
import sys

sys.path.append('../../database/src')

from database import db
from product import Product
from admin import Admin
from user import User
from error import Error
from type import Type
import smtplib
from email.mime.text import MIMEText
from email.header import Header

from help_admin import create_admin_id, create_token, add_to_database, check_email, check_password, admin_status, token_to_id

def add_admin(token, email, password):
    """
    This function is used for add a new admin and store to the database->admin table
    input: email, password, name, age, gender
    return: token
    """
    # handle token (check super admin)
    if (admin_status(token) == False):
        return {'error' : Error.query.filter(Error.error_id == 14).all()[0].error_name}
    # error handler
    # email is used by other users
    admins_email = Admin.query.filter(Admin.email==email).all()
    if (len(admins_email) > 0):
        return {'error' : Error.query.filter(Error.error_id == 3).all()[0].error_name}
    # email is invalid
    if (check_email(email) == False):
        return {'error' : Error.query.filter(Error.error_id == 2).all()[0].error_name}
    # password should be between 8-15
    if (check_password(password) == False):
        return {'error' : Error.query.filter(Error.error_id == 5).all()[0].error_name}

    # create a unique uid for the user
    admin_id = create_admin_id()
    # create token for the users
    new_token = create_token(admin_id)
    # input User infomation
    admin = Admin(new_token, admin_id, email, password, 0)
    # add data to database
    add_to_database(admin)

    output = {'token': token}
    return output


def admin_login(email, password):
    """
    """
    # error handler
    # all admin email
    admins_email = Admin.query.filter(Admin.email==email).all()
    # no admin
    if (len(admins_email) == 0):
        return {'error' : Error.query.filter(Error.error_id == 2).all()[0].error_name}
    # match email and password to find target admin
    admins = Admin.query.filter((Admin.email==email), (Admin.password==password)).all()
    # password incorrect
    if (len(admins) == 0):
        return {'error' : Error.query.filter(Error.error_id == 6).all()[0].error_name}
    # successful login
    target_admin = admins[0]
    target_admin.token = create_token(target_admin.admin_id)
    db.session.commit()
    output = {
        'token': target_admin.token,
        'status': target_admin.status}
    return output

def admin_logout(token):
    """
    """
    cur_admin_id = token_to_id(token)
    # no admin
    admins = Admin.query.filter((Admin.admin_id==cur_admin_id)).all()
    if (len(admins) == 0):
        return {'error' : Error.query.filter(Error.error_id == 2).all()[0].error_name}
    target_admin = admins[0]
    target_admin.token = create_token(0)
    db.session.commit()
    return {'is_success': True}


def edit_password(token, new_password):
    """
    """
    cur_admin_id = token_to_id(token)
    # password should be between 8-15
    if (check_password(new_password) == False):
        return {'error' : Error.query.filter(Error.error_id == 5).all()[0].error_name}

    admin_info = Admin.query.filter(Admin.admin_id==cur_admin_id).all()[0]
    admin_info.password = new_password
    db.session.commit()
    return {}

def show_all_admins(token):
    """
    """
    # check token
    cur_admin_id = token_to_id(token)
    admins = Admin.query.filter((Admin.admin_id==cur_admin_id)).all()
    if (len(admins) == 0):
        return {'error' : Error.query.filter(Error.error_id == 2).all()[0].error_name}
    # add info
    admins = Admin.query.all()
    admin_info = []
    for i in admins:
        admin_datils = {"admin_id": i.admin_id, "email": i.email, "password": i.password}
        admin_info.append(admin_datils)

    admins_profile = {'admins_profile': admin_info}
    return admins_profile

# def show_all_users_profile():
#     """
#     """
#     user_profile = []
#     all_user_interest = User.query.join(Type, User.interest).all()
#     # user_info = User.query.
#     # for users in all_user_interest:
#     #     user = {"user_id": users.admin_id, "email": users.email, "password": users.password}
#     #     user_profile.append(user)
#     # output = {}
#     # output['all_users_profile'] = user_profile
#     return all_user_interest

#if __name__ == "__main__":
    # email = "1807655499@qq.com"
    # password = "Boss#12"
    # target_admin = Admin.query.filter((Admin.email==email), (Admin.password==password)).all()
    # #print(target_admin)
    # if (len(target_admin) == 0): {
    #     print("1111111111111111111111111")
    # }
    # print(target_admin[0])
    print(Error.query.filter(Error.error_id == 6).all()[0].error_name)
