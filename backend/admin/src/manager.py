"""
auth.py is admin for authentication
"""
import sys
sys.path.append('../../database/src')

from database import db
from admin import Admin
from error import Error
from type import Type
from help_admin import create_admin_id, create_token, add_to_database, check_email, check_password, admin_status, token_to_id, ErrorMessage

def add_admin(token, email, password):
    """
    This function is used for add a new admin and store to the database->admin table
    input: email, password, name, age, gender
    return: token
    """
    # handle token (check super admin)
    if (admin_status(token) == False):
        raise ErrorMessage(Error.query.filter(Error.error_id == 14).all()[0].error_name)
    # error handler
    # email is used by other users
    admins_email = Admin.query.filter(Admin.email==email).all()
    if (len(admins_email) > 0):
        raise ErrorMessage(Error.query.filter(Error.error_id == 3).all()[0].error_name)
    # email is invalid
    if (check_email(email) == False):
        raise ErrorMessage(Error.query.filter(Error.error_id == 2).all()[0].error_name)
    # password should be between 8-15
    if (check_password(password) == False):
        raise ErrorMessage(Error.query.filter(Error.error_id == 5).all()[0].error_name)

    # create a unique uid for the user
    admin_id = create_admin_id()
    # create token for the users
    new_token = create_token(admin_id)
    # input User infomation
    admin = Admin(new_token, admin_id, email, password, 0)
    # add data to database
    add_to_database(admin)

    output = {'token': new_token}
    return output

def delete_admin(token, email):
    """
    This function is used for add a new admin and store to the database->admin table
    input: email, password, name, age, gender
    return: token
    """
    # handle token (check super admin)
    #print(admin_status(token))

    if (admin_status(token) == False):
        raise ErrorMessage(Error.query.filter(Error.error_id == 14).all()[0].error_name)
    # create a unique uid for the user
    target_admin = Admin.query.filter(Admin.email == email).all()
    if (len(target_admin) == 0):
        raise ErrorMessage(Error.query.filter(Error.error_id == 14).all()[0].error_name)
    Admin.query.filter(Admin.email == email).delete()
    #target_admin[0].delete()
    db.session.commit()

    return {'is_success': True}

def admin_login(email, password):
    """
    This function is used for admin login
    input: email, password
    return: token, status
    """
    # error handler
    # all admin email
    admins_email = Admin.query.filter(Admin.email==email).all()
    # no admin
    if (len(admins_email) == 0):
        raise ErrorMessage(Error.query.filter(Error.error_id == 2).all()[0].error_name)
    # match email and password to find target admin
    admins = Admin.query.filter((Admin.email==email), (Admin.password==password)).all()
    # password incorrect
    if (len(admins) == 0):
        raise ErrorMessage(Error.query.filter(Error.error_id == 6).all()[0].error_name)
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
    This function is used for admin logout
    input: token
    return: logout result
    """
    cur_admin_id = token_to_id(token)
    # no admin
    admins = Admin.query.filter((Admin.admin_id==cur_admin_id)).all()
    if (len(admins) == 0):
        raise ErrorMessage(Error.query.filter(Error.error_id == 2).all()[0].error_name)
    target_admin = admins[0]
    target_admin.token = create_token(0)
    db.session.commit()
    return {'is_success': True}

def edit_password(token, new_password):
    """
    This function is used for admin edit account password
    input: email, nwe_password
    """
    cur_admin_id = token_to_id(token)
    # password should be between 8-15
    if (check_password(new_password) == False):
        raise ErrorMessage(Error.query.filter(Error.error_id == 5).all()[0].error_name)

    admin_info = Admin.query.filter(Admin.admin_id==cur_admin_id).all()[0]
    admin_info.password = new_password
    db.session.commit()
    return {}

def show_all_admins(token):
    """
    This function is used for show all admins
    input: token
    return: admins profile
    """
    # check token
    cur_admin_id = token_to_id(token)
    admins = Admin.query.filter((Admin.admin_id==cur_admin_id)).all()
    if (len(admins) == 0):
        raise ErrorMessage(Error.query.filter(Error.error_id == 2).all()[0].error_name)
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

# if __name__ == "__main__":
#     print(ErrorMessage(Error.query.filter(Error.error_id == 2).all()[0].error_name))
#     print(type(Error.query.filter(Error.error_id == 2).all()[0].error_name))
#     print(type('xxxxx'))
#     #admins_email = Admin.query.filter(Admin.email=="1807655499@qq.com").all()[0]
#     print(create_token(1))
#     print(token_to_id("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZG1pbl9pZCI6MH0.llOH9A-61dCWPFT2ZVsvbvpKnI9qpH0xrY2WeogY4jw"))
#     delete_admin("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZG1pbl9pZCI6MX0.WvxG2haQJJIf2yZVZowIAPcwFLQRyWYe2Gt6-UgZlS4", "123@qq.com")
