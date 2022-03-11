from sqlalchemy import Column, String, Integer, ForeignKey, Decimal, Boolean
from sqlalchemy.orm import relationship

from database import Base


class Cart(Base):
    __tablename__ = 'cart'

    cart_id = Column(Integer, primary_key=True)
    quantity = Column(Integer)
    price = Column(Decimal(20,2))
    checked = Column(Boolean)
    user_id = Column(Integer, ForeignKey('user.uid'))
    user = relationship("User", backref="cart")
    product_id = Column(Integer, ForeignKey('product.product_id'))
    product = relationship("Product", backref = "cart")

    def __init__(self, cart_id, user, product, checked, quantity, price):
        self.cart_id = cart_id
        self.user = user
        self.product = product
        self.checked = checked
        self.quantity = quantity
        self.price = price