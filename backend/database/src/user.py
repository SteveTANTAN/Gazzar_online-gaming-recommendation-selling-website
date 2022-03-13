from sqlalchemy import Column, String, Integer, Boolean, ForeignKey
from sqlalchemy.orm import relationship, backref


from database import db
from type import Type

user_type_connection = db.Table(
    'user_type_connection',
    db.Column('user_id', db.Integer, db.ForeignKey('user.user_id'), primary_key=True),
    db.Column('type_id', db.Integer, db.ForeignKey('type.type_id'), primary_key=True)
)

class User(db.Model):
    __tablename__ = 'user'

    token = db.Column(db.String(100))
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    age = db.Column(db.Integer)
    gender = db.Column(db.Integer)
    email = db.Column(db.String(100))
    password = db.Column(db.String(100))
    interest = db.relationship('Type', secondary=user_type_connection, lazy='subquery', backref=db.backref('user', lazy=True))

    def __init__(self, token, user_id, name, age, gender, email, password):
        self.token = token
        self.user_id = user_id
        self.name = name
        self.age = age
        self.gender = gender
        self.email = email
        self.password = password

# if __name__ == "__main__":
#     # show_product()
#     all_admin = db.session().query(User).all()
#     for p in all_admin:
#         print(f'{p.user_id}')