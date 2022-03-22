import sys
sys.path.append('../../database/src')

from product import Product
from database import db
from order import Order
from user import User
from type import Type
from error import Error
from order_detail import Order_detail
import datetime
import ast
import smtplib
import pprint

from help import token_to_id, create_oid, add_to_database, ErrorMessage, create_cdk

def user_order_add(token, product_list):
    user_id = token_to_id(token)
    # check valid user
    users = User.query.filter(User.user_id==user_id).all()
    if len(users) == 0:
        raise ErrorMessage(Error.query.filter(Error.error_id == 17).all()[0].error_name)
    target_user = users[0]

    order_id = create_oid()
    order = Order(order_id, target_user)
    add_to_database(order)

    create_time= datetime.datetime.now()
    for product in product_list:
        target_product = Product.query.filter(Product.product_id==int(product['product_id'])).all()[0]
        target_product.stock = target_product.stock - int(product['quantity'])
        db.session.commit()
        cdkey = create_cdk()
        product_id = target_product.product_id
        product_name = target_product.name
        product_description = target_product.description
        product_price = target_product.price
        product_discount = target_product.discount
        product_main_image = target_product.main_image
        product_rate = 0
        product_comment = ''

        all_order_detail_id = Order_detail.query.all()
        if len(all_order_detail_id) != 0:
            order_detail_id = (all_order_detail_id[-1].order_detail_id) + 1
        else:
            order_detail_id = 1

        order_detail= Order_detail(order_detail_id, int(product['quantity']), create_time, cdkey, order, product_id, product_name,
                product_description, product_price, product_discount, product_main_image, product_rate, product_comment)
        add_to_database(order_detail)
    return

def delete_user_order(order_detail_id):
    target_order_detail = Order_detail.query.filter(Order_detail.order_detail_id==order_detail_id).all()[0]
    order_id = (target_order_detail.order_id,)
    db.session.delete(target_order_detail)
    db.session.commit()

    # FETCH ALL THE RECORDS IN THE RESPONSE
    result = db.session.query(Order_detail.order_id).all()
    if order_id in result:
         pass
    else:
        target_order = Order.query.filter(Order.order_id==order_id).all()[0]
        db.session.delete(target_order)
        db.session.commit()
    #print(target_order.order_id)


def show_user_order_count(token):
    user_id = token_to_id(token)
    target_user_orders = Order.query.filter(Order.user_id==user_id).count()
    return target_user_orders

def rate_comment_order(token, order_detail_id, rate, comment):
    u_id = token_to_id(token)
    # check valid user
    users = User.query.filter(User.user_id==u_id).all()
    if len(users) == 0:
        raise ErrorMessage(Error.query.filter(Error.error_id == 17).all()[0].error_name)
    # check valid rate - (0.0, 5.0]
    if rate <= 0 or rate > 5:
        raise ErrorMessage(Error.query.filter(Error.error_id == 18).all()[0].error_name)
    # check valid comment - not null
    if comment == '':
        raise ErrorMessage(Error.query.filter(Error.error_id == 19).all()[0].error_name)
    # access target_order_detail
    target_order_detail = Order_detail.query.filter(Order_detail.order_detail_id==order_detail_id).all()[0]
    if target_order_detail.product_rate != 0:
        raise ErrorMessage(Error.query.filter(Error.error_id == 20).all()[0].error_name)
    target_order_detail.product_rate = int(rate)
    target_order_detail.product_comment = comment
    db.session.commit()

    target_product_id = target_order_detail.product_id
    rate_count = 1
    sum_rate = 5.0
    order_details = Order_detail.query.filter(Order_detail.product_id==target_product_id).all()
    for i in order_details:
        if i.product_rate != 0:
            rate_count = rate_count + 1
            sum_rate = sum_rate + float(i.product_rate)
    overall_rate = sum_rate / float(rate_count)
    target_product = Product.query.filter(Product.product_id==target_product_id).all()[0]
    target_product.rate = format(float(overall_rate), '.1f')
    if target_product.comment == '':
        target_product.comment = comment
    else:
        target_product.comment = target_product.comment + ' || ' + comment
    db.session.commit()
    return

def show_user_order(token):
    user_id = token_to_id(token)
    # order details
    target_user_order = Order.query.filter(Order.user_id==user_id).all()
    output = []
    for i in target_user_order:
        target_order_detail = Order_detail.query.filter(Order_detail.order_id==i.order_id).all()
        for product in target_order_detail:
            order_info = {}
            order_info['order_detail_id'] = product.order_detail_id
            order_info['order_id'] = product.order_id
            order_info['quantity'] = product.quantity
            order_info['create_time'] = product.create_time
            order_info['cdkey'] = product.cdkey
            order_info['product_id'] = product.product_id
            order_info['product_name'] = product.product_name
            order_info['product_description'] = product.product_description
            order_info['product_price'] = float(product.product_price)
            order_info['product_discount'] = product.product_discount
            order_info['product_main_image'] = product.product_main_image
            order_info['product_rate'] = float(format(product.product_rate, '.1f'))
            order_info['product_comment'] = product.product_comment
            output.append(order_info)
    output = sorted(output, key=lambda e:e['order_detail_id'], reverse= True)
    return output

#if __name__ == "__main__":
    #token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjJ9.OeDycojnBAH3tuWeaoRGhE_M9M_I-rBnlcNCVetVKOg'
    #product_str = [{"product_id": 3, "quantity": 5}, {"product_id": 2, "quantity": 3}]
    #user_order_add(token, product_str)
    #rate_comment_order(token, 3, 4, '')
    #res = show_user_order(token)
    #pprint.pprint(res)
    #delete_user_order(5)