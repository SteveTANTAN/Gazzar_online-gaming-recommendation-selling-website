from sqlalchemy import Column, String, Integer, Boolean, ForeignKey
from sqlalchemy.orm import relationship, backref

from database import db



class Type(db.Model):
    __tablename__ = 'type'

    type_id = db.Column(db.Integer, primary_key=True)
    type_name = db.Column(db.String(100))

    def __init__(self, type_id, type_name):
        self.type_id = type_id
        self.type_name = type_name

# if __name__ == "__main__":
#     # show_product()
#     all_admin = db.session().query(Type).all()
#     for p in all_admin:
#         print(f'{p.type_name}')
