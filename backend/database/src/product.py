from database import db
from type import Type

product_type_connection = db.Table(
        'product_type_connection',
        db.Column('product_id', db.Integer, db.ForeignKey('product.product_id'), primary_key=True),
        db.Column('type_id', db.Integer, db.ForeignKey('type.type_id'), primary_key=True)
    )

class Product(db.Model):
    __tablename__ = 'product'

    product_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.String(500))
    price = db.Column(db.Float(10,2))
    discount = db.Column(db.Integer)
    # 0-default 1-unpromotion
    status = db.Column(db.Integer)
    stock = db.Column(db.Integer)
    main_image = db.Column(db.String(500))
    sub_image = db.Column(db.String(500))
    rate = db.Column(db.Float(2,1))
    comment = db.Column(db.String(500))
    # 0-game 1-peripheral
    category = db.Column(db.Integer)

    genre = db.relationship("Type", secondary=product_type_connection, lazy='subquery', backref=db.backref('product', lazy=True))
    
    def __init__(self, product_id, name, description, price, status, stock, main_image, category):
        self.product_id = product_id
        self.name = name
        self.description = description
        self.price = price
        self.discount = 100
        self.status = status
        self.stock = stock
        self.main_image = main_image
        self.sub_image = ""
        self.rate = 5.0
        self.comment = ""
        self.category = category

# if __name__ == "__main__":
#     # show_product()
#     all_product = Product.query.join(Type, Product.genre).filter(Type.type_id==1).all()
#     for p in all_product:
#         print(f'{p.product_id}')
