from sqlalchemy.orm import relationship

from database import db
from product import Product
from order import Order

class Order_detail(db.Model):
    __tablename__ = 'order_detail'

    order_detail_id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer)
    create_time = db.Column(db.DateTime)
    cdkey = db.Column(db.String(100))
    # one to many
    order_id = db.Column(db.Integer, db.ForeignKey('order.order_id'))
    order = db.relationship('Order', lazy='select', backref=db.backref('order_detail', lazy='joined'))
    # one to many
    product_id = db.Column(db.Integer, db.ForeignKey('product.product_id'))
    product = db.relationship('Product', lazy='select', backref=db.backref('order_detail', lazy='joined'))

    def __init__(self, order_detail_id, quantity, create_time, cdkey, order, product):

        self.order_detail_id = order_detail_id
        self.quantity = quantity
        self.create_time = create_time
        self.cdkey = cdkey
        self.order = order
        self.product = product

# if __name__ == "__main__":
#     # show_product()
#     all_admin = db.session().query(Order_detail).all()
#     for p in all_admin:
#         print(f'{p.product}')
