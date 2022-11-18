from ..models import db, Menu, MenuReview
from flask_restful import Resource, abort, reqparse, marshal_with, fields
import datetime

menu_resource_field = {
    "id": fields.Integer,
    "name": fields.String,
    "price": fields.Integer,
    "category": fields.String,
    "restaurant_name": fields.String,
    "restaurant_id": fields.Integer,
    "restaurant_location": fields.String,
    "image_url": fields.String,
    "is_deleted": fields.Boolean,
}

menu_review_resource_field = {
    "id": fields.Integer,
    "menu_id": fields.Integer,
    "review_by": fields.Integer,
    "review_content": fields.String,
    "review_rating": fields.Integer,
    "review_date": fields.DateTime,
    "is_deleted": fields.Boolean,
}

menu_add_args = reqparse.RequestParser()
menu_add_args.add_argument("name", type=str, required=True,
                           help="[Request Parser]: Args: name < Must be string or not empty.")
menu_add_args.add_argument("price", type=int, required=True,
                           help="[Request Parser]: Args: price < Must be integer or not empty.")
menu_add_args.add_argument("category", type=str, required=True,
                           help="[Request Parser]: Args: category < Must be string or not empty.")
menu_add_args.add_argument("restaurant_name", type=str, required=True,
                           help="[Request Parser]: Args: restaurant_name < Must be string or not empty.")
menu_add_args.add_argument("restaurant_location", type=str, required=True,
                           help="[Request Parser]: Args: restaurant_location < Must be string or not empty.")
menu_add_args.add_argument("image_url", type=str, required=True,
                           help="[Request Parser]: Args: image_url < Must be string or not empty.")
menu_add_args.add_argument("restaurant_id", type=int, required=True,
                           help="[Request Parser]: Args: restaurant_id < Must be integer or not empty.")

menu_update_args = reqparse.RequestParser()
menu_update_args.add_argument("name", type=str,
                              help="[Request Parser]: Args: name < Must be string.")
menu_update_args.add_argument("price", type=int,
                              help="[Request Parser]: Args: price < Must be integer.")
menu_update_args.add_argument("category", type=str,
                              help="[Request Parser]: Args: category < Must be string.")
menu_update_args.add_argument("restaurant_name", type=str,
                              help="[Request Parser]: Args: restaurant_name < Must be string.")
menu_update_args.add_argument("restaurant_location", type=str,
                              help="[Request Parser]: Args: restaurant_location < Must be string.")
menu_update_args.add_argument("image_url", type=str,
                              help="[Request Parser]: Args: image_url < Must be string.")
menu_update_args.add_argument("restaurant_id", type=int,
                              help="[Request Parser]: Args: restaurant_id < Must be integer.")
menu_update_args.add_argument("is_deleted", type=bool,
                              help="[Request Parser]: Args: is_deleted < Must be integer.")

menu_review_add_args = reqparse.RequestParser()
menu_review_add_args.add_argument("menu_id", type=int, required=True,
                                  help="[Request Parser]: Args: menu_id < Must be integer or not empty.")
menu_review_add_args.add_argument("review_by", type=int, required=True,
                                  help="[Request Parser]: Args: review_by < Must be integer or not empty.")
menu_review_add_args.add_argument("review_content", type=str, required=True,
                                  help="[Request Parser]: Args: review_content < Must be string or not empty.")
menu_review_add_args.add_argument("review_rating", type=int, required=True,
                                  help="[Request Parser]: Args: review_rating < Must be integer or not empty.")
menu_review_add_args.add_argument("is_deleted", type=bool, required=True,
                                  help="[Request Parser]: Args: is_deleted < Must be boolean or not empty.")

menu_review_update_args = reqparse.RequestParser()
menu_review_update_args.add_argument("menu_id", type=int,
                                     help="[Request Parser]: Args: menu_id < Must be integer.")
menu_review_update_args.add_argument("review_by", type=int,
                                     help="[Request Parser]: Args: review_by < Must be integer.")
menu_review_update_args.add_argument("review_content", type=str,
                                     help="[Request Parser]: Args: review_content < Must be string.")
menu_review_update_args.add_argument("review_rating", type=int,
                                     help="[Request Parser]: Args: review_rating < Must be integer.")
menu_review_update_args.add_argument("is_deleted", type=bool,
                                     help="[Request Parser]: Args: is_deleted < Must be boolean.")


class MenuRoute(Resource):
    @marshal_with(menu_resource_field)
    def get(self, req_id=None):
        if req_id == None:
            menus = Menu.query.all()
            return menus
        menu = Menu.query.filter_by(id=req_id).first()
        if not menu:
            abort(
                404, message="Error: This menu with specified restaurant_id not exists in our database.")
        db.session.close()
        return menu

    @marshal_with(menu_resource_field)
    def post(self):
        args = menu_add_args.parse_args()
        menu_name, res_id = args["name"], args["restaurant_id"]
        menu = Menu.query.filter_by(
            name=menu_name, restaurant_id=res_id).first()
        if menu:
            abort(
                409, message="Error: Current menu with this restaurant are already exists in database.")
        menu = Menu(
            name=args["name"],
            price=args["price"],
            category=args["category"],
            restaurant_name=args["restaurant_name"],
            restaurant_id=args["restaurant_id"],
            restaurant_location=args["restaurant_location"],
            image_url=args["image_url"]
        )
        db.session.add(menu)
        db.session.commit()
        db.session.close()
        return menu, 201

    @marshal_with(menu_resource_field)
    def patch(self, req_id):
        args = menu_update_args.parse_args()
        menu = Menu.query.filter_by(id=req_id).first()
        if not menu:
            abort(
                404, message="Error: This menu with specified restaurant_id not exists in our database.")
        if args["name"]:
            menu.name = args["name"]
        if args["price"]:
            menu.price = args["price"]
        if args["category"]:
            menu.category = args["category"]
        if args["restaurant_name"]:
            menu.restaurant_name = args["restaurant_name"]
        if args["restaurant_location"]:
            menu.restaurant_location = args["restaurant_location"]
        if args["image_url"]:
            menu.image_url = args["image_url"]
        db.session.commit()
        db.session.close()
        return menu, 201


class MenuReviewRoute(Resource):
    @marshal_with(menu_review_resource_field)
    def get(self, req_id=None):
        if req_id == None:
            menu_reviews = MenuReview.query.all()
            return menu_reviews
        menu_review = MenuReview.query.filter_by(id=req_id).first()
        if not menu_review:
            abort(
                404, message="Error: This menu review with specified menu_review_id not exists in our database.")
        return menu_review

    @marshal_with(menu_review_resource_field)
    def post(self):
        args = menu_review_add_args.parse_args()
        id, by = args["menu_id"], args["review_by"]
        menu_review = MenuReview.query.filter_by(
            menu_id=id, review_by=by).first()
        if menu_review:
            abort(
                409, message="Error: This user already review for this menu.")
        menu_review = MenuReview(
            menu_id=args["menu_id"],
            review_by=args["review_by"],
            review_content=args["review_content"],
            review_rating=args["review_rating"],
            is_deleted=args["is_deleted"],
        )
        db.session.add(menu_review)
        db.session.commit()
        db.session.close()
        return menu_review, 201

    @marshal_with(menu_review_resource_field)
    def patch(self, req_id):
        args = menu_review_update_args.parse_args()
        menu_review = MenuReview.query.filter_by(id=req_id).first()
        if not menu_review:
            abort(
                404, message="Error: This menu review with specified menu_review_id not exists in our database.")
        if args["menu_id"]:
            menu_review.menu_id = args["menu_id"]
        if args["review_by"]:
            menu_review.review_by = args["review_by"]
        if args["review_content"]:
            menu_review.review_content = args["review_content"]
        if args["review_rating"]:
            menu_review.review_rating = args["review_rating"]
        if args["is_deleted"]:
            menu_review.is_deleted = args["is_deleted"]
        db.session.commit()
        db.session.close()
        return menu_review, 201

    @marshal_with(menu_review_resource_field)
    def delete(self, req_id=None):
        if req_id == None:
            abort(
                409, message="Error: menu_review_id are required in order to delete review.")
        menu_review = MenuReview.query.filter_by(
            id=req_id).first()
        if not menu_review:
            abort(
                404, message="Error: This menu review with specified review_id not exists in our database.")
        menu_review.is_deleted = True
        db.session.commit()
        db.session.close()
        return menu_review, 201
