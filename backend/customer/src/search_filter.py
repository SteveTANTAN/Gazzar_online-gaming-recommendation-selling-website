"""
search.py is used for search product with given str
match in product name and description
This file will include the search
"""
from cgitb import reset
from tabnanny import check
from unittest import result
import sys
sys.path.append('../../database/src')
from database import db
from product import Product
from type import Type
from json import dumps

from sqlalchemy import or_,and_
db.create_all()
def search(str):
    #print(str)
    task_filter = {
        or_(
            Product.name.contains(str),
            Product.description.contains(str)
        )
    }
    search_result = Product.query.filter(*task_filter).all()
    result = []
    for i in search_result:
        temp = {"product_id": i.product_id, "name": i.name}
        result.append(temp)
    #result =[{"product_id": 31, "name": "Grand Theft Auto (series)"}, {"product_id": 32, "name": "Grand Theft Auto (series)"}, {"product_id": 33, "name": "Grand Theft Auto (series)"}, {"product_id": 34, "name": "Grand Theft Auto (series) on PC"}, {"product_id": 35, "name": "Grand Theft Auto (series)"}, {"product_id": 36, "name": "Grand Theft Auto (series)"}, {"product_id": 37, "name": "Grand Theft Auto III"}, {"product_id": 38, "name": "Grand Theft Auto V"}, {"product_id": 39, "name": "Grand Theft Auto: Episodes from Liberty City"}, {"product_id": 40, "name": "Grand Theft Auto: Vice City"}, {"product_id": 43, "name": "Hearts of Iron"}]
    return result

def filter():
    pass



# if __name__ == "__main__":
#     result = search('grand')
#     print(dumps(result))
#     count = 0
#     for i in result:
#         count = count + 1
#     print (f'Total search result: {count}')

 #cart imput pro_id pro_quantity token