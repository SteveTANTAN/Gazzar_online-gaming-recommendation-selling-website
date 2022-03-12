from sqlalchemy.orm import relationship


from database import db
from product import Product
from user import User

class Cart(db.Model):
    __tablename__ = 'cart'

    cart_id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer)
    # 0-uncheck 1-checked
    checked = db.Column(db.Integer)
    # one to many
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'))
    user = db.relationship('User', lazy='select', backref=db.backref('cart', lazy='joined'))
    # one to many
    product_id = db.Column(db.Integer, db.ForeignKey('product.product_id'))
    product = db.relationship('Product', lazy='select', backref=db.backref('cart', lazy='joined'))

    def __init__(self, cart_id, checked, quantity, user, product):
        self.cart_id = cart_id
        self.user = user
        self.product = product
        self.checked = checked
        self.quantity = quantity
# if __name__ == "__main__":
#     # show_product()
#     all_admin = db.session().query(Cart).all()
#     for p in all_admin:
#         print(f'{p.user}')
