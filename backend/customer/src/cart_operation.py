"""
cart_opeartion.py is used for customer cart-relevant operation
This file will include the add_to_cart, 
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
        cart_id = len(Cart.query.all()) + 1
        new_cart = Cart(cart_id, 0, quantity, target_user, target_product)
        add_to_database(new_cart)
        return
    cur_item = target_cart[0]
    # if product has been exist in current user's cart, add up the quantity of the product
    cur_item.quantity = cur_item.quantity + quantity
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
        # convert main_image and sub_image string to list
        cover = ast.literal_eval(target_product.main_image)
        cover_image = {'image': cover[0]['thumbUrl']}
        target_product_info = {
            'product_id': target_product.product_id,
            'name': target_product.name,
            'description': target_product.description,
            'main_image': cover_image,
            'current_price': float(target_product.price) * float(target_product.discount) * (0.01),
            'quantity': item.quantity,
            'checked ': item.checked
        }
        cart_products.append(target_product_info)

    output = {
        'user_id': u_id,
        'cart_products': cart_products
    }
    return output

def checked_product(token, product_id):
    u_id = token_to_id(token)
    # check valid user
    users = User.query.filter(User.user_id==u_id).all()
    if len(users) == 0:
        raise ErrorMessage(Error.query.filter(Error.error_id == 17).all()[0].error_name)
    # check and get valid product
    products = Product.query.filter(Product.product_id==product_id).all()
    if len(products) == 0:
        raise ErrorMessage(Error.query.filter(Error.error_id==16).all()[0].error_name)
    # access target item
    target_cart_item = Cart.query.filter(Cart.user_id==u_id, Cart.product_id==product_id).all()[0]
    target_cart_item.checked = 1
    return

def re_checked_product(token, product_id):
    u_id = token_to_id(token)
    # check valid user
    users = User.query.filter(User.user_id==u_id).all()
    if len(users) == 0:
        raise ErrorMessage(Error.query.filter(Error.error_id == 17).all()[0].error_name)
    # check and get valid product
    products = Product.query.filter(Product.product_id==product_id).all()
    if len(products) == 0:
        raise ErrorMessage(Error.query.filter(Error.error_id==16).all()[0].error_name)
    # access target item
    target_cart_item = Cart.query.filter(Cart.user_id==u_id, Cart.product_id==product_id).all()[0]
    target_cart_item.checked = 0
    return

if __name__ == "__main__":
    # add_to_cart('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjB9.iQfXIXBl6UUzeise2YrpHK43XimDKNSu6iCE7NKtB5wf', 123, 6)
    # add_to_cart('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjB9.iQfXIXBl6UUzeise2YrpHK43XimDKNSu6iCE7NKtB5wf', 120, 5)
    # add_to_cart('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjB9.iQfXIXBl6UUzeise2YrpHK43XimDKNSu6iCE7NKtB5wf', 121, 3)
    # add_to_cart('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjB9.iQfXIXBl6UUzeise2YrpHK43XimDKNSu6iCE7NKtB5wf', 122, 4)

    # pprint.pprint(Cart.query.filter(Cart.user_id == 15).all())
    checked_product('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjB9.iQfXIXBl6UUzeise2YrpHK43XimDKNSu6iCE7NKtB5wf', 123)
    checked_product('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjB9.iQfXIXBl6UUzeise2YrpHK43XimDKNSu6iCE7NKtB5wf', 120)
    res = show_cart_products('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjB9.iQfXIXBl6UUzeise2YrpHK43XimDKNSu6iCE7NKtB5wf')
    pprint.pprint(res)