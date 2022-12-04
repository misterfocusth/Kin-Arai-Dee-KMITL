"""Init Flask & Database Connection"""
from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from .models import db
from .routes.userRoute import UserRoute, LiffRoute
from .routes.restaurantRoute import RestaurantRoute, RestaurantReviewRoute
from .routes.menuRoute import MenuRoute, MenuReviewRoute
from .routes.randomRoute import RandomRoute
import os

from dotenv import load_dotenv
load_dotenv()


def create_database(app):
    """Create database files using model schema"""
    with app.app_context():
        db.create_all()


def create_app():
    """Create application and api services"""
    app = Flask(__name__)
    CORS(app)
    app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///db.db'
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)
    api = Api(app)
    api.add_resource(UserRoute, "/apis/user/<int:req_id>", "/apis/user/")
    api.add_resource(
        LiffRoute, "/apis/user/liff/<string:req_user_id>")
    api.add_resource(
        RestaurantRoute, "/apis/restaurant/<int:req_id>", "/apis/restaurant/")
    api.add_resource(
        RestaurantReviewRoute, "/apis/restaurant/review/<int:req_id>", "/apis/restaurant/review/", "/apis/restaurant/review/<int:req_user_id>/<int:req_restaurant_id>")
    api.add_resource(
        MenuRoute, "/apis/menu/<int:req_id>", "/apis/menu/")
    api.add_resource(
        MenuReviewRoute, "/apis/menu/review/<int:req_id>", "/apis/menu/review/", "/apis/menu/review/<int:req_user_id>/<int:req_menu_id>")
    api.add_resource(
        RandomRoute, "/apis/random/", "/apis/random/<int:req_random_id>", "/apis/random/user/<int:req_random_by>")
    create_database(app)
    return app
