"""
search.py is used for search product with given str
match in product name and description
This file will include the search
"""
import sys
sys.path.append('../../database/src')
from database import db
from product import Product
from type import Type

from sqlalchemy import or_,and_

def search(str):
    task_filter = {
        or_(
            Product.name.contains(str),
            Product.description.contains(str)
        )
    }
    search_result = Product.query.filter(*task_filter).all()
    return search_result

def filter():
    pass


if __name__ == "__main__":
    result = search('MK3')
    count = 0
    for i in result:
        print(f'product id: {i.product_id}, product name: {i.name}') #, product description: {i.description}
        count = count + 1
    print (f'Total search result: {count}')
