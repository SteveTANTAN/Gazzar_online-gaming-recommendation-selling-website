from database import db

class Order_detail(db.Model):
    __tablename__ = 'order_detail'

    order_detail_id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer)
    create_time = db.Column(db.DateTime)
    cdkey = db.Column(db.String(100))
    product_id = db.Column(db.Integer)
    product_name = db.Column(db.String(100))
    product_description = db.Column(db.String(500))
    product_price = db.Column(db.Float(10,2))
    product_discount = db.Column(db.Integer)
    product_main_image = db.Column(db.String(500))
    product_rate = db.Column(db.Float(2,1))
    product_comment = db.Column(db.String(500))
    # one to many
    order_id = db.Column(db.Integer, db.ForeignKey('order.order_id'))
    # order = db.relationship('Order', lazy='select', backref=db.backref('order_detail', lazy='joined'))

    def __init__(self, order_detail_id, quantity, create_time, cdkey, order_id,
        product_id, product_name, product_description, product_price, product_discount,
        product_main_image, product_rate, product_comment):

        self.order_detail_id = order_detail_id
        self.quantity = quantity
        self.create_time = create_time
        self.cdkey = cdkey
        self.order_id = order_id
        self.product_id = product_id
        self.product_name = product_name
        self.product_description = product_description
        self.product_price = product_price
        self.product_discount = product_discount
        self.product_main_image = product_main_image
        self.product_rate = product_rate
        self.product_comment = product_comment

# if __name__ == "__main__":
#     # show_product()
#     all_admin = db.session().query(Order_detail).all()
#     for p in all_admin:
#         print(f'{p.product}')
