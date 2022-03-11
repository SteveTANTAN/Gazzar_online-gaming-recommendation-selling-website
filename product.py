from sqlalchemy import Column, String, Integer, ForeignKey, Decimal, Boolean
from sqlalchemy.orm import relationship

from database import Base


class Product(Base):
    __tablename__ = 'product'

    product_id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    price = Column(Decimal(10,2))
    discount = Column(Integer)
    status = Column(Boolean)
    stock = Column(Integer)
    main_image = Column(String)
    sub_image = Column(String)
    rate = Column(Decimal(2,1))
    comment = Column(String)
    type_1_id = Column(Integer, ForeignKey('product_type.type_id'))
    type_1 = relationship("Product_type", backref = "product")
    type_2_id = Column(Integer, ForeignKey('product_type.type_id'))
    type_2 = relationship("Product_type", backref = "product")

    def __init__(self, product_id, name, description, price, stock, main_image, sub_image, type_1, type_2):
        self.product_id = product_id
        self.name = name
        self.description = description
        self.price = price
        self.stock = stock
        self.main_image = main_image
        self.sub_image = sub_image
        self.rate = 5.0
        self.comment = ""
        self.type_1 = type_1
        self.type_2 = type_2