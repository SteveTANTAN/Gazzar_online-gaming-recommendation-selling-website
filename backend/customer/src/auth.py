"""
auth.py is used for authentication
"""
import sys
sys.path.append('../../database/src')

from database import db
from user import User
from cart import Cart
from order import Order
from type import Type
from product import Product
from payment_detail import Payment_detail
from error import Error
import smtplib
from email.mime.text import MIMEText
from email.header import Header
import pprint

from help import create_uid, create_token, add_to_database, check_email, check_password, token_to_id, ErrorMessage

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
        raise ErrorMessage(Error.query.filter(Error.error_id == 3).all()[0].error_name)
    # email is invalid
    if (check_email(email) == False):
        raise ErrorMessage(Error.query.filter(Error.error_id == 2).all()[0].error_name)
    # password should be between 8-15
    if (check_password(password) == False):
        raise ErrorMessage(Error.query.filter(Error.error_id == 5).all()[0].error_name)

    # create a unique uid for the user
    uid = create_uid()
    # create token for the users
    token = create_token(uid)
    # input User infomation
    # ---------------------------------------------------------------------gender 0,1,2
    user = User(token, uid, name, age, gender, email, password)
    # add data to database
    add_to_database(user)

    output = {'token': token}
    return output

def user_login(email, password):
    """
    This function is used for user login
    input: email, password, name
    return: token
    """
    # error handler
    # all users email
    users_email = User.query.filter(User.email==email).all()
    # no users
    if (len(users_email) == 0):
        raise ErrorMessage(Error.query.filter(Error.error_id == 2).all()[0].error_name)
    # get email and password correctly
    users = User.query.filter((User.email==email), (User.password==password)).all()
    # password incorrect
    if (len(users) == 0):
        raise ErrorMessage(Error.query.filter(Error.error_id == 6).all()[0].error_name)
    # successful login
    target_user = users[0]
    target_user.token = create_token(target_user.user_id)
    db.session.commit()
    output = {'token': target_user.token}
    return output

def user_logout(token):
    """
    This function is used for user login
    input: token
    return: logout result
    """
    cur_user_id = token_to_id(token)
    # no user
    users = User.query.filter(User.user_id==cur_user_id).all()
    if (len(users) == 0):
        raise ErrorMessage(Error.query.filter(Error.error_id == 2).all()[0].error_name)
    target_user = users[0]
    target_user.token = create_token(0)
    db.session.commit()
    return {'is_success': True}

def forget_password(email_user):
    """
    This function is used for user forget password
    input: token
    """
    user_email = User.query.filter(User.email==email_user).all()[0]
    sender = 'g368231@gmail.com'
    receivers = [user_email.email]

    MY_ADDRESS = 'g368231@gmail.com'
    PASSWORD = 'chf12345678'

    message = MIMEText('Your Gazzar password is ' + user_email.password, 'plain', 'utf-8')
    message['From'] = Header("Gazzar", 'utf-8')

    subject = 'Gazzar password'
    message['Subject'] = Header(subject, 'utf-8')

    s = smtplib.SMTP(host='smtp.gmail.com', port=587)
    s.starttls()
    s.login(MY_ADDRESS, PASSWORD)

    s.sendmail(sender, receivers, message.as_string())
    s.quit()

    return {'is_success': True}


def edit_password(token, new_password):
    """
    This function is used for user edit password
    input: token, new passowrd
    """
    user_id = token_to_id(token)
    # password should be between 8-15
    if (check_password(new_password) == False):
        raise ErrorMessage(Error.query.filter(Error.error_id == 5).all()[0].error_name)

    target_user = User.query.filter(User.user_id==user_id).all()[0]
    target_user.password = new_password
    db.session.commit()
    return {}

def show_user_profile(token):
    """
    This function is used for show user profile
    input: token
    return: user profile
    """
    user_id = token_to_id(token)
    #print("-------------")
    # user details
    target_user = User.query.filter(User.user_id==user_id).all()[0]
    user_info = {"token": target_user.token, "user_id": target_user.user_id,
            "name": target_user.name, "age": target_user.age,
            "gender": target_user.gender, "email": target_user.email, "password": target_user.password}

    info_user = []
    info_user.append(user_info)

    output = {}
    output['user_info'] = info_user

    return output

def show_user_payment(token):
    user_id = token_to_id(token)
    # # payment details
    target_user_payment = Payment_detail.query.join(User).filter(Payment_detail.user_id==user_id).all()
    payment_info = []
    for i in target_user_payment:
        payment_details = {'card_type': i.card_type, 'card_number': i.card_number,
            'name_on_card': i.name_on_card, 'expration_date': i.expration_date}
        payment_info.append(payment_details)

    output = {}
    output['payment_info'] = payment_info
    return output

def show_user_cart(token):
    user_id = token_to_id(token)
    # # cart details
    target_user_cart = Cart.query.join(User).filter(Cart.user_id==user_id).all()
    cart_info = {'card_count': len(target_user_cart)}
    info_cart = []
    info_cart.append(cart_info)

    output = {}
    output['cart_info'] = info_cart
    return output

def show_user_order(token):
    user_id = token_to_id(token)
    # order details
    target_user_order = Order.query.join(User).filter(Order.user_id==user_id).all()
    order_info = {'order_count': len(target_user_order)}

    info_order = []
    info_order.append(order_info)

    output = {}
    output['order_info'] = info_order
    return output

# if __name__ == "__main__":
#     token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjF9.zf40wtVW374ygpDOvfCMhBfnLrddY2Y9C6IlDmzwxy4"
#     print(show_user_profile(token))
#     print(show_user_payment(token))
#     print(show_user_cart(token))
#     print(show_user_order(token))
    # payment_details = Payment_detail.query.join(User).filter(Payment_detail.user_id==1).all()
    # for i in payment_details:
    #     print(i.card_type)
