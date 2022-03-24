from flask import Flask
from flask_sqlalchemy import SQLAlchemy
#from sqlalchemy import Column, String, Integer, ForeignKey, Boolean, Float, Table

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:vision@114.55.74.30:3306/gazzar"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# print(db)
