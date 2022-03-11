from sqlalchemy import Column, String, Integer, Boolean, ForeignKey
from sqlalchemy.orm import relationship, backref

from database import Base


class Admin(Base):
    __tablename__ = 'admin'

    token = Column(String)
    admin_id = Column(Integer, primary_key=True)
    email = Column(String)
    password = Column(String)

    def __init__(self, token, admin_id, email, password):
        self.token = token
        self.admin_id = admin_id
        self.email = email
        self.password = password