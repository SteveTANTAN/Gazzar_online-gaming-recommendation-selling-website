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

def admin_search(token, search_text, category_id):
    # handle token valid
    cur_admin_id = token_to_id(token)
    admins = Admin.query.filter((Admin.admin_id==cur_admin_id)).all()
    if (len(admins) == 0):
        raise ErrorMessage(Error.query.filter(Error.error_id == 2).all()[0].error_name)
    #search
    data = []
    all_product = Product.query.filter(Product.category == category_id)\
    .filter(Product.name.like("%" + search_text + "%"))\
    .all()
    for target_product in all_product:
        temp = {}
        temp['id'] = target_product.product_id
        temp['product name'] = target_product.name
        output_type = []
        for product_type_name in target_product.genre:
            output_type.append(product_type_name.type_name)
        temp["type"] = ', '.join(output_type)
        temp['rate'] = float(target_product.rate)
        if target_product.status == 0: temp['state'] = 'On Sale'
        temp['state'] = 'On Promotion'
        #temp['state'] = str(target_product.status)
        temp['last modified by'] = target_product.last_modified
        temp['stock'] = target_product.stock
        #output['data'].append(temp)
        data.append(temp)
    #print(output)
    return data

# if __name__ == "__main__":
#     # show_product()
#     print(search_product("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZG1pbl9pZCI6N30.TXCJtaZOn9wmEn4grtsztibK2SxnwC_3F7ms-fkQOUQ", "ga", 0))
