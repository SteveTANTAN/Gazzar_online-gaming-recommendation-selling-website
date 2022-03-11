from sqlalchemy import Column, String, Integer, ForeignKey, Decimal, Boolean, DateTime
from sqlalchemy.orm import relationship

from database import Base


class Order_detail(Base):
    __tablename__ = 'order_detail'

    order_detail_id = Column(Integer, primary_key=True)
    quantity = Column(Integer)
    product_name = Column(String)
    product_image = Column(String)
    product_detail = Column(String)
    current_price = Column(Decimal(20,2))
    current_discount = Column(Integer)
    total_price = Column(Decimal(20,2))
    create_time = Column(DateTime)
    cdkey = Column(String)
    order_id = Column(Integer, ForeignKey('order.order_id'))
    order = relationship("Order", backref = "order_detail")
    product_id = Column(Integer, ForeignKey('product.product_id'))
    product = relationship("Product", backref = "order_detail")

    def __init__(self, order_detail_id, quantity, product_name, product_image, 
        product_detail, current_price, current_discount, total_price, create_time, cdkey, order, product):

        self.order_detail_id = order_detail_id
        self.quantity = quantity
        self.product_name = product_name
        self.product_image = product_image
        self.product_detail = product_detail
        self.current_price = current_price
        self.current_discount = current_discount
        self.total_price = total_price
        self.create_time = create_time
        self.cdkey = cdkey
        self.order = order
        self.product = product
