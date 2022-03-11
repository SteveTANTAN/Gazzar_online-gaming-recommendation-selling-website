from sqlalchemy import Column, String, Integer, ForeignKey, Decimal, Boolean
from sqlalchemy.orm import relationship

from database import Base


class Product_type(Base):
    __tablename__ = 'product_type'

    type_id = Column(Integer, primary_key=True)
    type_name = Column(String)

    def __init__(self, type_id, type_name):
        self.type_id = type_id
        self.type_name = type_name
