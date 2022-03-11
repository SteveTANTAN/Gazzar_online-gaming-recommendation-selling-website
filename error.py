from sqlalchemy import Column, String, Integer, ForeignKey, Decimal, Boolean
from sqlalchemy.orm import relationship

from database import Base


class Error(Base):
    __tablename__ = 'error'

    error_id = Column(Integer, primary_key=True)
    error_name = Column(String)

    def __init__(self, error_id, error_name):
        self.error_id = error_id
        self.error_name = error_name
    