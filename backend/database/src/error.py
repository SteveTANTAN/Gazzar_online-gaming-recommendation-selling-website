from sqlalchemy.orm import relationship, backref

from database import db


class Error(db.Model):
    __tablename__ = 'error'

    error_id = db.Column(db.Integer, primary_key=True)
    error_name = db.Column(db.String(100))

    def __init__(self, error_id, error_name):
        self.error_id = error_id
        self.error_name = error_name
    