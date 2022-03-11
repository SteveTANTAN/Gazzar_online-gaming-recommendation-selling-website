from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


engine = create_engine("mysql+pymysql://admin:mysql1234@gazzar.cyyjsjb2yprw.ap-southeast-1.rds.amazonaws.com/gazzar", pool_recycle=3600)
Session = sessionmaker(bind=engine)
Base = declarative_base()
# application = Flask(__name__)
# application.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://{admin}:{mysql1234}@{3301}/{gazzar.db}'
# db = SQLAlchemy(application)

# class user(db.Model):
#     uid = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(80), unique=True, nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=False)

#     def __repr__(self):
#         return '<User %r>' % self.name

# metadata = MetaData(bind=engine)

# users = Table('users', metadata, autoload=True)
# con = engine.connect()
# print(engine.table_names())
# con.execute(users.insert(), name='admin', email='admin@localhost')

# users.select(users.c.id == 1).execute().first()
# admin = db.user(uid = 1, name='admin', email='admin@example.com')
# db.user.add(admin)
# db.user.commit()
# db.query.all()
# admin = user(uid = 1, name='admin', email='admin@example.com')
# db.session.add(admin)
# db.session.commit()

# user.query.all()

# if __name__ == '__main__':
#     application.run()
