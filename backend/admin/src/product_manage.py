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


def add_product(token, product_dict, product_category):
    #product_dict = json.loads(input_product_dict)

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
def edit_product(token, product_dict):
    # product_dict = json.loads(input_product_dict)
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
def get_product(token, product_id):
    # handle token valid
    cur_admin_id = token_to_id(token)
    admins = Admin.query.filter((Admin.admin_id==cur_admin_id)).all()
    if (len(admins) == 0):
        raise ErrorMessage(Error.query.filter(Error.error_id == 2).all()[0].error_name)

    # get product
    output = {}
    target_product = Product.query.filter(Product.product_id == product_id).all()[0]
    output["Product Name"] = target_product.name
    output["Product description"] = target_product.description
    output["State"] = str(target_product.status)
    output["Stock"] = target_product.stock
    output["Unit Price"] = float(target_product.price)
    output["Discount"] = target_product.discount
    output["Cover"] = ast.literal_eval(target_product.main_image)
    #print(type(output['Cover']))
    output["Photo"] = ast.literal_eval(target_product.sub_image)
    output_type = []
    for product_type_name in target_product.genre:
        output_type.append(product_type_name.type_name)
    output["Product Type"] = output_type
    #print(output)
    return output



# def delete_product(token, product_id):
#     #product_dict = json.loads(input_product_dict)
#     # handle token valid
#     cur_admin_id = token_to_id(token)
#     admins = Admin.query.filter((Admin.admin_id==cur_admin_id)).all()
#     if (len(admins) == 0):
#         raise ErrorMessage(Error.query.filter(Error.error_id == 2).all()[0].error_name)

#     # add product
#     # Cart.query.filter(Cart.product_id == product_id).delete()
    
#     Product.query.filter(Product.product_id == product_id).delete()

#     #Product.query.delete(target_product)
#     db.session.commit()

#     #print(target_product.genre)
#     return {'is_success': True}

#if __name__ == "__main__":
    # show_product()
    #delete_product("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZG1pbl9pZCI6N30.TXCJtaZOn9wmEn4grtsztibK2SxnwC_3F7ms-fkQOUQ", 5)

    # product_dict = {"Product Name": "aaa", "Unit Price": 123, "Discount": 55, "State": "1", "Stock": 55, "Product Type": ["Crafts", "Clothes", "Daily necessities"], "Product description": "abcdefg",
    # "Cover": [{"thumbUrl": "data:image/png;base64"}],
    # "Photo": [{"uid": "rc-upload-1647614711752-3", "lastModified": 1647614740987, "lastModifiedDate": "2022-03-18T14:45:40.987Z",
    # "name": "1647602143(1).jpg", "size": 13764, "type": "image/jpeg", "percent": 100,
    # "originFileObj": {"uid": "rc-upload-1647614711752-3"}, "status": "done",
    # "response": "<!DOCTYPE html>\\n<html>\\n  <head>\\n    <meta charset=utf-8 />\\n    <meta\\n      name=viewport\\n      content=width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no\\n    />\\n    <link rel=stylesheet href=/umi.css />\\n    <script>\\n      window.routerBase = /;\\n    </script>\\n    <script src=/@@/devScripts.js></script>\\n    <script>\\n      //! umi version: 3.5.21\\n    </script>\\n  </head>\\n  <body>\\n    <div id=root></div>\\n\\n    <script src=/umi.js></script>\\n  </body>\\n</html>\\n",
    # "xhr": {},
    # "thumbUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAAXNSR0IArs4c6QAAIABJREFUeF7svdmvbXt21zdmt9rdnH36c7tqbhUGF6YwVbYx2CYCZPOYNz8goiAlSh7yp+QheYrylFcUhBBJpMiKiKLgIBuwkcBYNhWXq27dqtvf0+5udTP6jN/vO9dYc8+19z5V1w6WWNLROWc1c/7m7ze+o2+KyYOvt01dmm0W9jd+8a/af/Vf/Od2cHBg/93/8D/ZP/2n/9TOzs6sLEvj1RZm68L/ufMqrbBivbG2ba0oCluvVmZF4f9+nVdVVdd+netvNhv/DtfWuuKP1mVjRZHWu++la/D50DVeZ8033YdnYt3am/73N+t191bTzNI+h+fk//v2Rfur7/s9RrX/nuc6Pj62y8tLOz8/N2vrwX1ZlWkP+KM1cr/CmsFH4zu8uPZ6vXb62JSVtXb17PjufD63pmn8+pPJxJ4+fWora7pzrOvar8N3m2Jlo9HI17uChq47w/XCys3a6WA2m/nvWQvX0plGGuHMtXaeDxr3tW/OrChrW1lpbT22jVVWVLWN142vuyjvvduWhdnI1vZrv/q37L/5r/9Lm03G9t/+9/+j/cZv/IZdXFx0y9wHkKI1KzetHySLWC4W/xEgZk4ENwEk0kBVjm8NEB22fu9EXRS2KhITgUhEIE6AGz6/yjheByACOtcej9NaF4uFrbluUW/pJIOINWktED6/A7BtNem+yxoByVe/+lV7/tmHdnp6aq9eveqIWfe8gpV2ZVW7cUDcv3/fP/7888/9ftqbfQBhHRA/3z05mVrdjO2Tp8/tbLkxg8FWtc1s4iAq7O6fa221sLIu7MtvPLJv/ZVvWlOV9pv/z7+wDz/80BYXF1aPRung9kgQAFK15ugH+YvLy/8IkFsCJErZssj7fAsJEgmBwz48PHRAvDg/teVy6cQI4XHI/P/01SVy9wqd/TgAgfDF9ZE"}]
    # }
    # #print(product_dict["Photo"])
    # print(add_product("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZG1pbl9pZCI6N30.TXCJtaZOn9wmEn4grtsztibK2SxnwC_3F7ms-fkQOUQ", product_dict, 0))
    # #print(get_product("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZG1pbl9pZCI6N30.TXCJtaZOn9wmEn4grtsztibK2SxnwC_3F7ms-fkQOUQ", 15))