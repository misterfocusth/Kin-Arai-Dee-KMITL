"""Init Flask & Database Connection"""
from flask import Flask
from flask_restful import Api
from dotenv import load_dotenv
from .models import db
from .routes.userRoute import UserRoute
from .routes.restaurantRoute import RestaurantRoute
import os
load_dotenv()

db_host = os.getenv("SQL_DATABASE_HOST")
db_username = os.getenv("SQL_DATABASE_USERNAME")
db_password = os.getenv("SQL_DATABASE_PASSWORD")
SQLALCHEMY_DATABASE_URI = "mysql+pymysql://%s:%s@%s:3306/test" % (
    db_username, db_password, db_host)


def create_database(app):
    with app.app_context():
        db.create_all()


def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)
    api = Api(app)
    api.add_resource(UserRoute, "/apis/user/<int:req_id>", "/apis/user/")
    api.add_resource(
        RestaurantRoute, "/apis/restaurant/<int:req_id>", "/apis/restaurant/")
    create_database(app)
    return app
