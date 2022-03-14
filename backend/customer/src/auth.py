"""
auth.py is used for authentication
This file will include the user_register
"""
import sys

sys.path.append('../../database/src')

from database import db
from product import Product
from user import User
from error import Error
from help import create_uid, create_token, add_to_database, check_email
def user_register(email, password, name, age, gender):
    """
    This function is used for register user and store to the database->user table
    input: email, password, name, age, gender
    return: token
    """
    # error handler
    # email is used by other users
    users_email = User.query.filter(User.email==email).all()
    if (len(users_email) > 0):
        return Error.query.filter(Error.error_id == 3).all()[0].error_name
    # email is invalid
    if (check_email(email) == False):
        return Error.query.filter(Error.error_id == 2).all()[0].error_name
    # password should be between 8-15
    if (len(password) < 8 or len(password) > 15):
        return Error.query.filter(Error.error_id == 5).all()[0].error_name

    # creat a unique uid for the user
    uid = create_uid()
    # create token for the users
    token = create_token(uid)
    # input User infomation
    user = User(token, uid, name, age, gender, email, password)
    # add data to databse
    add_to_database(user)

    return token

def user_login(email, password):
    """
    """
    # get email and password correctly
    users = User.query.filter((User.email==email), (User.password==password)).all()
    # all users email
    users_email = User.query.filter(User.email==email).all()
    # error handler
    # no users
    if (len(users_email) == 0):
        return Error.query.filter(Error.error_id == 2).all()[0].error_name
    # password incorrect
    if (len(users) == 0): 
        return Error.query.filter(Error.error_id == 6).all()[0].error_name
    # successful login
    return users[0].token

def edit_password(user_id, new_password):
    """
    """
    # password should be between 8-15
    if (len(new_password) < 8 or len(new_password) > 15):
        return Error.query.filter(Error.error_id == 5).all()[0].error_name
    # A@1
    user_info = User.query.filter(User.user_id==user_id).all()[0]
    user_info.password = new_password
    db.session.commit()
    return 0

def show_user_profile(user_id):
    """
    """
    user_info = User.query.filter(User.user_id==user_id).all()[0]
    user = []
    user.append(user_info.token)
    user.append(user_info.user_id)
    user.append(user_info.name)
    user.append(user_info.age)
    user.append(user_info.gender)
    user.append(user_info.email)
    user.append(user_info.password)
    # user.append(user_info.address)
    # user.append(user_info.payment)
    return user

if __name__ == "__main__":
    print(user_register("fkhfj@qq.com", "fgfasfkh", "jfkahs",1,"M"))
    #print(user_login("fkashfj@qq.com", "fgfasfkh"))
    print(edit_password(2, "fahsjfggjh"))
    print(show_user_profile(2))

