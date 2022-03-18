"""
prodcut.py is product for managing
"""

import sys
sys.path.append('../../database/src')

from database import db
from product import Product
from error import Error
from help_admin import ErrorMessage


def add_product(token, product_dict):
    # handle token valid
    # add product
    print(product_dict)
    return {'is_success': True}