from flask import Flask
from flask_sqlalchemy import SQLAlchemy
#from sqlalchemy import Column, String, Integer, ForeignKey, Boolean, Float, Table

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://admin:mysql1234@database-1.cgfuomjyt0wg.ap-southeast-2.rds.amazonaws.com/gazzar"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# print(db)
