from sqlalchemy import Column, String, Integer, Date, Table, ForeignKey
from sqlalchemy.orm import relationship

from database import Base

class Order(Base):
    __tablename__ = 'order'

    order_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.uid'))
    user = relationship("User", backref = "Order")

    def __init__(self, order_id, user):
        self.order_id = order_id
        self.user = user