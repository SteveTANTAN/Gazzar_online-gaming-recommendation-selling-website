"""
payment_opeartion.py is used for customer payment-relevant operation
"""
import sys
sys.path.append('../../database/src')
from database import db
from user import User
from error import Error
from payment_detail import Payment_detail

from help import token_to_id, ErrorMessage, add_to_database
import pprint

def show_user_payment(token):
    u_id = token_to_id(token)
    # check valid user
    users = User.query.filter(User.user_id==u_id).all()
    if len(users) == 0:
        raise ErrorMessage(Error.query.filter(Error.error_id == 17).all()[0].error_name)
    # payment details
    target_user_payment = Payment_detail.query.join(User).filter(Payment_detail.user_id==u_id).all()
    payment_info = []
    for i in target_user_payment:
        payment_details = {'payment_detail_id': i.payment_detail_id, 'card_type': i.card_type, 'card_number': i.card_number,
                        'name_on_card': i.name_on_card, 'expration_date': i.expration_date}
        payment_info.append(payment_details)

    return payment_info

def add_payment(token, payment_dict):
    u_id = token_to_id(token)
    # check valid user
    users = User.query.filter(User.user_id==u_id).all()
    if len(users) == 0:
        raise ErrorMessage(Error.query.filter(Error.error_id == 17).all()[0].error_name)
    target_user = users[0]

    all_payment_detail_id = Payment_detail.query.all()
    if len(all_payment_detail_id) != 0:
        payment_detail_id = (all_payment_detail_id[-1].payment_detail_id) + 1
    else:
        payment_detail_id = 1
    new_payment_detail = Payment_detail(payment_detail_id, payment_dict['card_type'], int(payment_dict['card_number']),
                            payment_dict['name_on_card'], payment_dict['expration_date'], target_user)
    add_to_database(new_payment_detail)
    return


def delete_payment(token, payment_detail_id):
    u_id = token_to_id(token)
    # check valid user
    users = User.query.filter(User.user_id==u_id).all()
    if len(users) == 0:
        raise ErrorMessage(Error.query.filter(Error.error_id == 17).all()[0].error_name)

    # access target payment detail
    target_payment_detail = Payment_detail.query.filter(Payment_detail.user_id==u_id, Payment_detail.payment_detail_id==payment_detail_id).all()[0]
    db.session.delete(target_payment_detail)
    db.session.commit()
    return

if __name__ == "__main__":
#     add_payment('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjB9.iQfXIXBl6UUzeise2YrpHK43XimDKNSu6iCE7NKtB5wf',
#         {'card_type': 'MasterCard', 'card_number': 623213123, 'name_on_card': 'XXXX XX', 'expration_date': '2323-12-31, 12:21, XXXX'})
    res = show_user_payment('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjE1fQ.6HRn7wRRh2sOI0CnPq5V0wXe1ixDHbVLFPRlU-ll-po')
    pprint.pprint(res)
#     # delete_payment('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjB9.iQfXIXBl6UUzeise2YrpHK43XimDKNSu6iCE7NKtB5wf', 4)
