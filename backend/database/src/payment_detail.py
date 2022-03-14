from sqlalchemy.orm import relationship
from database import db
from user import User

class Payment_detail(db.Model):
    __tablename__ = 'payment_detail'
    payment_details_id = db.Column(db.Integer, primary_key=True)
    card_type = db.Column(db.String(100))
    card_number = db.Column(db.Integer)
    name_on_card = db.Column(db.String(100))
    expration_date = db.Column(db.DateTime)
    # one to many
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'))
    user = db.relationship('User', lazy='select', backref=db.backref('payment_detail', lazy='joined'))

    def __init__(self, payment_details_id, card_type, card_number, name_on_card, expration_date, user):
        self.payment_details_id = payment_details_id
        self.user = user
        self.card_type = card_type
        self.card_number = card_number
        self.name_on_card = name_on_card
        self.expration_date = expration_date