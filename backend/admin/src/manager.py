"""
auth.py is used for authentication
This file will include the user_register
"""
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

from help_admin import create_admin_id, create_token, add_to_database, check_email, check_password, admin_is_superadmin

def add_admin(email, password):
    """
    This function is used for register user and store to the database->user table
    input: email, password, name, age, gender
    return: token
    """
    # error handler
    # email is used by other users
    admins_email = Admin.query.filter(Admin.email==email).all()
    if (len(admins_email) > 0):
        return Error.query.filter(Error.error_id == 3).all()[0].error_name
    # email is invalid
    if (check_email(email) == False):
        return Error.query.filter(Error.error_id == 2).all()[0].error_name
    # password should be between 8-15
    if (check_password(password) == False):
        return Error.query.filter(Error.error_id == 5).all()[0].error_name

    # creat a unique uid for the user
    admin_id = create_admin_id()
    # create token for the users
    token = create_token(uid)
    # input User infomation
    admin = Admin(token, admin_id, email, password, 0)
    # add data to databse
    add_to_database(admin)

    output = {}
    output['token'] = token
    return output


def admin_login(email, password):
    """
    """
    # get email and password correctly
    admins = Admin.query.filter((Admin.email==email), (Admin.password==password)).all()
    # all users email
    admins_email = Admin.query.filter(Admin.email==email).all()
    # error handler
    # no users
    if (len(admins_email) == 0):
        return Error.query.filter(Error.error_id == 2).all()[0].error_name
    # password incorrect
    if (len(admins) == 0): 
        return Error.query.filter(Error.error_id == 6).all()[0].error_name
    # successful login
    output = {}
    output['token'] = admins[0].token
    return output

def admin_logout(admin_id):
    """
    """
    return True

def forget_password(admin_id):
    """
    """
    admin_email = Admin.query.filter(Admin.admin_id==admin_id).all()[0]
    sender = 'g368231@gmail.com'
    receivers = [admin_email.email]

    MY_ADDRESS = 'g368231@gmail.com'
    PASSWORD = 'chf12345678'
	
	
    message = MIMEText('Your Gazza password is ' + admin_email.password, 'plain', 'utf-8')
    message['From'] = Header("Gazzar", 'utf-8')


    subject = 'Gazza password'
    message['Subject'] = Header(subject, 'utf-8')

    s = smtplib.SMTP(host='smtp.gmail.com', port=587)
    s.starttls()
    s.login(MY_ADDRESS, PASSWORD)

    s.sendmail(sender, receivers, message.as_string())
    s.quit()

    return {}


def edit_password(admin_id, new_password):
    """
    """
    # password should be between 8-15
    if (check_password(new_password) == False):
        return Error.query.filter(Error.error_id == 5).all()[0].error_name

    admin_info = Admin.query.filter(Admin.admin_id==admin_id).all()[0]
    admin_info.password = new_password
    db.session.commit()
    return {}

def show_all_admins_profile(token):
    """
    """
    user_profile = []
    user_info = Admin.query.all()
    for admin in user_info:
        user = {"admin_id": admin.admin_id, "email": admin.email, "password": admin.password}
        user_profile.append(user)

    output = {}
    output['all_admins_profile'] = user_profile
    return output

def show_all_users_profile():
    """
    """
    user_profile = []
    all_user_interest = User.query.join(Type, User.interest).all()
    # user_info = User.query.
    # for users in all_user_interest:
    #     user = {"user_id": users.admin_id, "email": users.email, "password": users.password}
    #     user_profile.append(user)
    # output = {}
    # output['all_users_profile'] = user_profile
    return all_user_interest
# if __name__ == "__main__":
#     # show_product()
#     print(show_all_users_profile())
