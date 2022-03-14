from sqlalchemy.orm import relationship

from database import db
from user import User


class Order(db.Model):
    __tablename__ = 'order'

    order_id = db.Column(db.Integer, primary_key=True)
    # one to many
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'))
    user = db.relationship('User', lazy='select', backref=db.backref('order', lazy='joined'))


    def __init__(self, order_id, user):
        self.order_id = order_id
        self.user = user
# if __name__ == "__main__":
#     # show_product()
#     all_admin = db.session().query(Order).all()
#     for p in all_admin:
#         print(f'{p.order_id}')