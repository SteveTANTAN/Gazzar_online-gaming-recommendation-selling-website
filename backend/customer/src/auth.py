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
import smtplib
from email.mime.text import MIMEText
from email.header import Header

from help import create_uid, create_token, add_to_database, check_email, check_password

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
    if (len(password) < 8 or len(password) > 15 or check_password(password) == False):
        return Error.query.filter(Error.error_id == 5).all()[0].error_name

    # creat a unique uid for the user
    uid = create_uid()
    # create token for the users
    token = create_token(uid)
    # input User infomation
    user = User(token, uid, name, age, gender, email, password)
    # add data to databse
    add_to_database(user)

    output = {}
    output['token'] = token
    return output

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
    output = {}
    output['token'] = users[0].token
    return output

def user_logout(user_id):
    """
    """
    return True

def forget_password(user_id):
    """
    """
    user_email = User.query.filter(User.user_id==user_id).all()[0]
    sender = 'g368231@gmail.com'
    receivers = [user_email.email]

    MY_ADDRESS = 'g368231@gmail.com'
    PASSWORD = 'chf12345678'
	
	
    message = MIMEText('Your Gazza password is ' + user_email.password, 'plain', 'utf-8')
    message['From'] = Header("Gazzar", 'utf-8')


    subject = 'Gazza password'
    message['Subject'] = Header(subject, 'utf-8')

    s = smtplib.SMTP(host='smtp.gmail.com', port=587)
    s.starttls()
    s.login(MY_ADDRESS, PASSWORD)

    s.sendmail(sender, receivers, message.as_string())
    s.quit()

    return {}


def edit_password(user_id, new_password):
    """
    """
    # password should be between 8-15
    if (len(new_password) < 8 or len(new_password) > 15 or check_password(new_password) == False):
        return Error.query.filter(Error.error_id == 5).all()[0].error_name

    user_info = User.query.filter(User.user_id==user_id).all()[0]
    user_info.password = new_password
    db.session.commit()
    return {}

def show_user_profile(token):
    """
    """
    user_info = User.query.filter(User.token==token).all()[0]
    user = {"token": user_info.token, "user_id": user_info.user_id, 
            "name": user_info.name, "age": user_info.age, 
            "gender": user_info.gender, "email": user_info.email, "password": user_info.password}
    # user.append(user_info.address)
    # user.append(user_info.payment)
    user_profile = []
    user_profile.append(user)

    output = {}
    output['user_profile'] = user_profile
    return output

# if __name__ == "__main__":
#     print(show_user_profile(1))

