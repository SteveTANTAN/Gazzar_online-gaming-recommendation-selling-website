from database import db


class Admin(db.Model):
    __tablename__ = 'admin'

    admin_id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String(100))
    email = db.Column(db.String(100))
    password = db.Column(db.String(100))
    status = db.Column(db.Integer)

    def __init__(self, token, admin_id, email, password, status):
        self.token = token
        self.admin_id = admin_id
        self.email = email
        self.password = password
        self.status = status

# if __name__ == "__main__":
#     # show_product()
#     all_admin = db.session().query(Admin).all()
#     for p in all_admin:
#         print(f'{p.email}')