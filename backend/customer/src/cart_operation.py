"""
cart_opeartion.py is used for customer cart-relevant operation
"""
import sys
sys.path.append('../../database/src')
from database import db
from product import Product
from user import User
from cart import Cart
from error import Error

from help import token_to_id, ErrorMessage, add_to_database
import ast
import pprint

def add_to_cart(token, product_id, quantity):
    ''''''
    u_id = token_to_id(token)
    # check valid user
    users = User.query.filter(User.user_id==u_id).all()
    if len(users) == 0:
        raise ErrorMessage(Error.query.filter(Error.error_id == 17).all()[0].error_name)
    target_user = users[0]
    # check and get valid product
    products = Product.query.filter(Product.product_id==product_id).all()
    if len(products) == 0:
        raise ErrorMessage(Error.query.filter(Error.error_id==16).all()[0].error_name)
    target_product = products[0]

    # check whether product has been exist in current user's cart
    target_cart = Cart.query.filter(Cart.user_id==u_id, Cart.product_id==target_product.product_id).all()
    if len(target_cart) == 0:
        # create new cart and add to database
        all_cart_id = Cart.query.all()
        if len(all_cart_id) != 0:
            cart_id = (all_cart_id[-1].cart_id) + 1
        else:
            cart_id = 1
        #cart_id = len(Cart.query.all()) + 1
        new_cart = Cart(cart_id, 0, quantity, target_user, target_product)
        add_to_database(new_cart)
        return
    cur_item = target_cart[0]
    # if product has been exist in current user's cart, add up the quantity of the product
    cur_item.quantity = cur_item.quantity + int(quantity)
    db.session.commit()
    return

# def edit_product_quantity(token, )

def show_cart_products(token):
    ''''''
    u_id = token_to_id(token)
    # check valid user
    users = User.query.filter(User.user_id==u_id).all()
    if len(users) == 0:
        raise ErrorMessage(Error.query.filter(Error.error_id == 17).all()[0].error_name)
    # get target user's all cart products
    target_cart = Cart.query.join(User).filter(Cart.user_id==u_id).all()
    cart_products = []
    for item in target_cart:
        target_product = Product.query.join(Cart).filter(Product.product_id==item.product_id).all()[0]
        # convert main_image string to list
        cover = ast.literal_eval(target_product.main_image)
        cover_image = {'image': cover[0]['thumbUrl']}
        target_product_info = {
            'cart_id': item.cart_id,
            'product_id': target_product.product_id,
            'name': target_product.name,
            'description': target_product.description,
            'main_image': cover_image,
            'current_price': float(target_product.price) * float(target_product.discount) * (0.01),
            'quantity': item.quantity,
            'checked': item.checked
        }
        cart_products.append(target_product_info)
    return cart_products

def edit_checked_product(token, cart_id, checked):
    u_id = token_to_id(token)
    # check valid user
    users = User.query.filter(User.user_id==u_id).all()
    if len(users) == 0:
        raise ErrorMessage(Error.query.filter(Error.error_id == 17).all()[0].error_name)

    # access target cart item
    target_cart_item = Cart.query.filter(Cart.user_id==u_id, Cart.cart_id==cart_id).all()[0]
    target_cart_item.checked = int(checked)
    db.session.commit()
    return

def delete_cart_product(token, cart_id):
    u_id = token_to_id(token)
    # check valid user
    users = User.query.filter(User.user_id==u_id).all()
    if len(users) == 0:
        raise ErrorMessage(Error.query.filter(Error.error_id == 17).all()[0].error_name)

    # access target cart item
    target_cart_item = Cart.query.filter(Cart.user_id==u_id, Cart.cart_id==cart_id).all()[0]
    db.session.delete(target_cart_item)
    db.session.commit()
    return

def checkout(token):
    u_id = token_to_id(token)
    # check valid user
    users = User.query.filter(User.user_id==u_id).all()
    if len(users) == 0:
        raise ErrorMessage(Error.query.filter(Error.error_id == 17).all()[0].error_name)

    original_price = 0
    total_discount = 0
    actual_transaction = 0

    target_user_carts = Cart.query.filter(Cart.user_id==u_id).all()
    checkout_products = []
    for item in target_user_carts:
        if item.checked == 1:
            target_product = Product.query.join(Cart).filter(Product.product_id==item.product_id).all()[0]
             # convert main_image string to list
            cover = ast.literal_eval(target_product.main_image)
            target_product_info = {
                'cart_id': item.cart_id,
                'product_id': target_product.product_id,
                'name': target_product.name,
                'description': target_product.description,
                'main_image': cover[0]['thumbUrl'],
                'current_price': float(target_product.price) * float(target_product.discount) * (0.01),
                'quantity': item.quantity,
            }
            original_price = original_price + float(target_product.price) * float(item.quantity)
            total_discount = total_discount + float(target_product.discount * (0.01) * original_price)
            checkout_products.append(target_product_info)

    actual_transaction = float(original_price - total_discount)
    output = {
        'checkout_products': checkout_products,
        'original_price':  format(original_price, '.2f'),
        'total_discount': format(total_discount, '.2f'),
        'actual_transaction': format(actual_transaction, '.2f')
    }
    return output

def notify_quantity(token, cart_id, new_quantity):
    u_id = token_to_id(token)
    # check valid user
    users = User.query.filter(User.user_id==u_id).all()
    if len(users) == 0:
        raise ErrorMessage(Error.query.filter(Error.error_id == 17).all()[0].error_name)

    target_user_cart = Cart.query.filter(Cart.user_id==u_id, Cart.cart_id==cart_id).all()[0]
    target_user_cart.quantity = int(new_quantity)
    db.session.commit()
    return

def show_user_cart(token):
    user_id = token_to_id(token)
    target_user_carts = Cart.query.filter(Cart.user_id==user_id).all()
    return len(target_user_carts)

if __name__ == "__main__":
    add_to_cart("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjE3fQ.12Gqt0B29VWffPR7Fp6qjWhNa2jsgU21Ns6uZh6Ihto", 15, 1)