import sys
sys.path.append('../../database/src')

from product import Product
from database import db
from order import Order
from cart import Cart
from user import User
from type import Type
from error import Error
from order_detail import Order_detail
import datetime
import ast
import smtplib
import pprint

from help import token_to_id, add_to_database, ErrorMessage, create_cdk


# after checkout, create order and add order to user
def user_order_add(token, product_list):
    user_id = token_to_id(token)
    # check valid user
    users = User.query.filter(User.user_id==user_id).all()
    if len(users) == 0:
        raise ErrorMessage(Error.query.filter(Error.error_id == 17).all()[0].error_name)
    target_user = users[0]

    #remove cart product
    for product in product_list:
        cart_products = Cart.query.filter(Cart.product_id==int(product['product_id']), Cart.user_id==user_id).all()
        if len(cart_products) != 0:
            for target_product in cart_products:
                db.session.delete(target_product)
                db.session.commit()

    # create order_id as ascending
    all_order_id = Order.query.all()
    if len(all_order_id) != 0:
            order_id = (all_order_id[-1].order_id) + 1
    else:
        order_id = 1

    # create new order, add to DB
    order = Order(order_id, target_user)
    add_to_database(order)
    create_time= datetime.datetime.now()

    # loop product_list to get product id, then get product information by id
    for product in product_list:
        target_product = Product.query.filter(Product.product_id==int(product['product_id'])).all()[0]

        # stock of target product minus product quantity in order
        target_product.stock = target_product.stock - int(product['quantity'])
        db.session.commit()

        # collect product information
        cdkey = create_cdk()
        product_id = target_product.product_id
        product_name = target_product.name
        product_description = target_product.description
        product_price = target_product.price
        product_discount = target_product.discount
        product_main_image = target_product.main_image
        product_rate = 0
        product_comment = ''

        # create order_detail id
        all_order_detail_id = Order_detail.query.all()
        if len(all_order_detail_id) != 0:
            order_detail_id = (all_order_detail_id[-1].order_detail_id) + 1
        else:
            order_detail_id = 1

        # create new order_detail, and add to database
        order_detail= Order_detail(order_detail_id, int(product['quantity']), create_time, cdkey, order_id, product_id, product_name,
                product_description, product_price, product_discount, product_main_image, product_rate, product_comment)
        add_to_database(order_detail)
    return

# delete order history
def delete_user_order(order_detail_id):

    # find target order_detail
    target_order_detail = Order_detail.query.filter(Order_detail.order_detail_id==order_detail_id).first()
    order_id = target_order_detail.order_id

    # delete target order in order_detail table
    db.session.delete(target_order_detail)
    db.session.commit()
    order_detail_checker = Order_detail.query.filter(Order_detail.order_id==order_id).all()
    if len(order_detail_checker) == 0:

        # delete target order in order table
        target_order = Order.query.filter(Order.order_id==order_id).first()
        db.session.delete(target_order)
        db.session.commit()
    return

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

def show_user_order_detail(token):
    user_id = token_to_id(token)

    # order details
    target_user_order = Order.query.filter(Order.user_id==user_id).all()
    output = []
    for i in target_user_order:
        target_order_detail = Order_detail.query.filter(Order_detail.order_id==i.order_id).all()

        # collect product detail
        for product in target_order_detail:
            order_info = {}
            order_info['order_detail_id'] = product.order_detail_id
            order_info['order_id'] = product.order_id
            order_info['quantity'] = product.quantity
            order_info['create_time'] = (product.create_time).strftime('%Y-%m-%d %H:%M:%S')
            order_info['cdkey'] = product.cdkey
            order_info['product_id'] = product.product_id
            order_info['product_name'] = product.product_name
            order_info['product_description'] = product.product_description
            order_info['product_price'] = float(format(product.product_price, '.2f'))
            order_info['product_discount'] = product.product_discount
            order_info['product_main_image'] = ast.literal_eval(product.product_main_image)
            order_info['product_rate'] = float(format(product.product_rate, '.1f'))
            order_info['product_comment'] = product.product_comment

            # add orders to list
            output.append(order_info)
    output = sorted(output, key=lambda e:e['order_detail_id'], reverse= True)
    return output