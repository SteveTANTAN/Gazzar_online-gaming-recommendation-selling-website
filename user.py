from sqlalchemy import Column, String, Integer, Boolean, ForeignKey
from sqlalchemy.orm import relationship, backref

from database import Base


class User(Base):
    __tablename__ = 'user'

    token = Column(String)
    uid = Column(Integer, primary_key=True)
    name = Column(String)
    age = Column(Integer)
    gender = Column(String)
    email = Column(String)
    password = Column(String)

    def __init__(self, token, uid, name, age, gender, email, password):
        self.token = token
        self.uid = uid
        self.name = name
        self.age = age
        self.gender = gender
        self.email = email
        self.password = password

    # def get_token(self):
    #     return self.token
    
    # def get_uid(self):
    #     return self.uid
    
    # def update_token(new_token):
    #     self.token = new_token
    
    # def update_uid(new_uid):
    #     self.uid = new_uid

    

