"""
prodcut.py is product for managing
"""

import sys
sys.path.append('../../database/src')

from database import db
from product import Product
from type import Type
from admin import Admin
from error import Error
import json
import ast
from help_admin import ErrorMessage, create_product_id, token_to_id, add_to_database


def add_product(token, input_product_dict, product_category):
    product_dict = json.loads(input_product_dict)

    # handle token valid
    cur_admin_id = token_to_id(token)
    admins = Admin.query.filter((Admin.admin_id==cur_admin_id)).all()
    if (len(admins) == 0):
        raise ErrorMessage(Error.query.filter(Error.error_id == 2).all()[0].error_name)

    # add product
    product_name = product_dict['Product Name']
    product_description = product_dict['Product description']
    product_status = int(product_dict['State'])
    product_stock = product_dict['Stock']
    product_price = product_dict['Unit Price']
    product_discount = product_dict['Discount']

    product_main_image = str(product_dict['Cover'])
    product_sub_image = str(product_dict['Photo'])

    product_id = create_product_id()
    new_product = Product(product_id, product_name, product_description,
                    product_price, product_discount, product_status, product_stock, product_main_image, product_sub_image, product_category)
    new_product.last_modified = admins[0].email
    # add product type
    for product_type_name in product_dict['Product Type']:
        new_product_type = Type.query.filter(Type.type_name == product_type_name).all()[0]
        new_product.genre.append(new_product_type)
        add_to_database(new_product)

    return {'is_success': True}

def get_product(token, product_id):
    # handle token valid
    cur_admin_id = token_to_id(token)
    admins = Admin.query.filter((Admin.admin_id==cur_admin_id)).all()
    if (len(admins) == 0):
        raise ErrorMessage(Error.query.filter(Error.error_id == 2).all()[0].error_name)

    # get product
    output = {}
    target_product = Product.query.filter(Product.product_id == product_id).all()[0]
    output['Product Name'] = target_product.name
    output['Product description'] = target_product.description
    output['State'] = target_product.status
    output['Stock'] = target_product.stock
    output['Unit Price'] = target_product.price
    output['Discount'] = target_product.discount
    output['Cover'] = ast.literal_eval(target_product.main_image)
    #print(type(output['Cover']))
    output['Photo'] = ast.literal_eval(target_product.sub_image)
    output_type = []
    for product_type_name in target_product.genre:
        output_type.append(product_type_name.type_name)
    output['Product Type'] = output_type
    #print(output)
    return output

def edit_product(token, input_product_dict):
    product_dict = json.loads(input_product_dict)
    # handle token valid
    cur_admin_id = token_to_id(token)
    admins = Admin.query.filter((Admin.admin_id==cur_admin_id)).all()
    if (len(admins) == 0):
        raise ErrorMessage(Error.query.filter(Error.error_id == 2).all()[0].error_name)

    # add product
    target_product = Product.query.filter(Product.product_id == product_dict['Product Id']).all()[0]
    target_product.name = product_dict['Product Name']
    target_product.description = product_dict['Product description']
    target_product.status = int(product_dict['State'])
    target_product.stock = product_dict['Stock']
    target_product.price = product_dict['Unit Price']
    target_product.discount = product_dict['Discount']

    target_product.main_image = str(product_dict['Cover'])
    target_product.sub_image = str(product_dict['Photo'])
    target_product.last_modified = admins[0].email

    target_product.genre = []
    for product_type_name in product_dict['Product Type']:
        new_product_type = Type.query.filter(Type.type_name == product_type_name).all()[0]
        target_product.genre.append(new_product_type)
        db.session.commit()

    #print(target_product.genre)
    return {'is_success': True}

# if __name__ == "__main__":
#     # show_product()
#     get_product("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZG1pbl9pZCI6NH0.8AuOI2nvMER0IQug3_H-Quz1WEjeDWRhccsh-A61rYo", 1)
    