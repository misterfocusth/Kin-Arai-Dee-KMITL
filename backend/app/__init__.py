"""Init Flask & Database Connection"""
from flask import Flask
from flask_restful import Api
from .models import db
from .routes.userRoute import UserRoute, LiffRoute
from .routes.restaurantRoute import RestaurantRoute, RestaurantReviewRoute
from .routes.menuRoute import MenuRoute, MenuReviewRoute
import os

from dotenv import load_dotenv
load_dotenv()

db_host = os.environ['SQL_DATABASE_HOST']
db_username = os.environ['SQL_DATABASE_USERNAME']
db_password = os.environ['SQL_DATABASE_PASSWORD']
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
        LiffRoute, "/apis/user/<int:req_user_id>")
    api.add_resource(
        RestaurantRoute, "/apis/restaurant/<int:req_id>", "/apis/restaurant/")
    api.add_resource(
        RestaurantReviewRoute, "/apis/restaurant/review/<int:req_id>", "/apis/restaurant/review/")
    api.add_resource(
        MenuRoute, "/apis/menu/<int:req_id>", "/apis/menu/")
    api.add_resource(
        MenuReviewRoute, "/apis/menu/review/<int:req_id>", "/apis/menu/review/")
    create_database(app)
    return app
