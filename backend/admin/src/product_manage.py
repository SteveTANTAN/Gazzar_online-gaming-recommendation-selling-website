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

    # add product type
    for product_type_name in product_dict['Product Type']:
        new_product_type = Type.query.filter(Type.type_name == product_type_name).all()[0]
        new_product.genre.append(new_product_type)
        add_to_database(new_product)

    return {'is_success': True}

# def get_product(token, product_id):
#     # handle token valid
#     cur_admin_id = token_to_id(token)
#     admins = Admin.query.filter((Admin.admin_id==cur_admin_id)).all()
#     if (len(admins) == 0):
#         raise ErrorMessage(Error.query.filter(Error.error_id == 2).all()[0].error_name)
#     # get product
#     output = {}
#     target_product = Product.query.filter(Product.product_id == product_id).all()[0]
#     output['product_name'] = target_product.product_name
#     # output['product_']
#     return output

# def edit_product(token, product_dict):
#     # handle token valid
#     cur_admin_id = token_to_id(token)
#     admins = Admin.query.filter((Admin.admin_id==cur_admin_id)).all()
#     if (len(admins) == 0):
#         raise ErrorMessage(Error.query.filter(Error.error_id == 2).all()[0].error_name)

#     return {'is_success': True}

# if __name__ == "__main__":
#     # show_product()
#     list_a = "[{'uid': 'rc-upload-1647614711752-3', 'lastModified': 1647614740987},{'uid': 'rc-upload-1647614711752-3', 'lastModified': 1647614740987}]"
#     b = ast.literal_eval(list_a)
#     print(type(list_a))
#     print(b[0]['uid'])
    