from ..models import db, Restaurant, Restaurant_Review
from flask_restful import Resource, abort, reqparse, marshal_with, fields
import datetime

restaurant_resource_field = {
    "id": fields.Integer,
    "name": fields.String,
    "location": fields.String,
    "phone_number": fields.String,
    "category": fields.String,
    "image_url": fields.String
}

restaurant_review_resource_field = {
    "id": fields.Integer,
    "restaurant_id": fields.Integer,
    "review_by": fields.Integer,
    "review_content": fields.String,
    "review_rating": fields.Integer,
    "review_date": fields.DateTime,
    "is_deleted": fields.Boolean,
}

restaurant_add_args = reqparse.RequestParser()
restaurant_add_args.add_argument("name", type=str, required=True,
                                 help="[Request Parser]: Args: name < Must be string or not empty.")
restaurant_add_args.add_argument("location", type=str, required=True,
                                 help="[Request Parser]: Args: location < Must be string or not empty.")
restaurant_add_args.add_argument("phone_number", type=str, required=True,
                                 help="[Request Parser]: Args: phone_number < Must be string or not empty.")
restaurant_add_args.add_argument("category", type=str, required=True,
                                 help="[Request Parser]: Args: category < Must be string or not empty.")
restaurant_add_args.add_argument("image_url", type=str, required=True,
                                 help="[Request Parser]: Args: image_url < Must be string or not empty.")

restaurant_update_args = reqparse.RequestParser()
restaurant_update_args.add_argument("name", type=str,
                                    help="[Request Parser]: Args: name < Must be string.")
restaurant_update_args.add_argument("location", type=str,
                                    help="[Request Parser]: Args: location < Must be string.")
restaurant_update_args.add_argument("phone_number", type=str,
                                    help="[Request Parser]: Args: phone_number < Must be string.")
restaurant_update_args.add_argument("category", type=str,
                                    help="[Request Parser]: Args: category < Must be string.")
restaurant_update_args.add_argument("image_url", type=str,
                                    help="[Request Parser]: Args: image_url < Must be string.")

restaurant_review_add_args = reqparse.RequestParser()
restaurant_review_add_args.add_argument("restaurant_id", type=int, required=True,
                                        help="[Request Parser]: Args: restaurant_id < Must be integer or not empty.")
restaurant_review_add_args.add_argument("review_by", type=int, required=True,
                                        help="[Request Parser]: Args: review_by < Must be string or not empty.")
restaurant_review_add_args.add_argument("review_content", type=str, required=True,
                                        help="[Request Parser]: Args: review_content < Must be string or not empty.")
restaurant_review_add_args.add_argument("review_rating", type=int, required=True,
                                        help="[Request Parser]: Args: review_rating < Must be integer or not empty.")
restaurant_review_add_args.add_argument("review_date", type=datetime,
                                        help="[Request Parser]: Args: review_date < Must be datetime or not empty.")
restaurant_review_add_args.add_argument("is_deleted", type=bool, required=True,
                                        help="[Request Parser]: Args: is_deleted < Must be boolean or not empty.")

restaurant_review_update_args = reqparse.RequestParser()
restaurant_review_update_args.add_argument("restaurant_id", type=int,
                                           help="[Request Parser]: Args: restaurant_id < Must be integer.")
restaurant_review_update_args.add_argument("review_by", type=int,
                                           help="[Request Parser]: Args: review_by < Must be string.")
restaurant_review_update_args.add_argument("review_content", type=str,
                                           help="[Request Parser]: Args: review_content < Must be string.")
restaurant_review_update_args.add_argument("review_rating", type=int,
                                           help="[Request Parser]: Args: review_rating < Must be integer.")
restaurant_review_update_args.add_argument("review_date", type=datetime,
                                           help="[Request Parser]: Args: review_date < Must be datetime.")
restaurant_review_update_args.add_argument("is_deleted", type=bool,
                                           help="[Request Parser]: Args: is_deleted < Must be boolean.")


class RestaurantRoute(Resource):
    @marshal_with(restaurant_resource_field)
    def get(self, req_id=None):
        if req_id == None:
            restaurants = Restaurant.query.all()
            return restaurants
        restaurant = Restaurant.query.filter_by(id=req_id).first()
        if not restaurant:
            abort(
                404, message="Error: This restaurant with specified restaurant_id not exists in our database.")
        return restaurant

    @marshal_with(restaurant_resource_field)
    def post(self):
        args = restaurant_add_args.parse_args()
        restaurant_name = args["name"]
        restaurant = Restaurant.query.filter_by(name=restaurant_name).first()
        if restaurant:
            abort(
                409, message="Error: Current restaurant are already exists in database.")
        restaurant = Restaurant(
            name=args["name"],
            location=args["location"],
            phone_number=args["phone_number"],
            category=args["category"],
            image_url=args["image_url"]
        )
        db.session.add(restaurant)
        db.session.commit()
        return restaurant, 201

    @marshal_with(restaurant_resource_field)
    def patch(self, req_id):
        args = restaurant_update_args.parse_args()
        restaurant = Restaurant.query.filter_by(id=req_id).first()
        if not restaurant:
            abort(
                404, "Error: This user with specified user_id not exists in our database.")
        if args["name"]:
            restaurant.name = args["name"]
        if args["location"]:
            restaurant.location = args["location"]
        if args["phone_number"]:
            restaurant.phone_number = args["phone_number"]
        if args["category"]:
            restaurant.category = args["category"]
        if args["image_url"]:
            restaurant.image_url = args["image_url"]
        db.session.commit()
        return restaurant, 201


class RestaurantReviewRoute(Resource):
    @marshal_with(restaurant_review_resource_field)
    def get(self, req_id=None):
        if req_id == None:
            restaurant_reviews = Restaurant_Review.query.all()
            return restaurant_reviews
        restaurant_review = Restaurant_Review.query.filter_by(
            id=req_id).first()
        if not restaurant_review:
            abort(
                404, message="Error: This restaurant review specified review_id not exists in our database.")
        return restaurant_review

    @marshal_with(restaurant_review_resource_field)
    def post(self):
        args = restaurant_review_add_args.parse_args()
        id, by = args["restaurant_id"], args["review_by"]
        restaurant_review = Restaurant_Review.query.filter_by(
            restaurant_id=id, review_by=by).first()
        if restaurant_review:
            abort(409, message="Error: This user already review for this restaurant.")
        restaurant_review = Restaurant_Review(
            restaurant_id=args["restaurant_id"],
            review_by=args["review_by"],
            review_content=args["review_content"],
            review_rating=args["review_rating"],
            is_deleted=args["is_deleted"],
        )
        db.session.add(restaurant_review)
        db.session.commit()
        return restaurant_review, 201

    @marshal_with(restaurant_review_resource_field)
    def patch(self, req_id):
        args = restaurant_review_update_args.parse_args()
        restaurant_review = Restaurant_Review.query.filter_by(
            id=req_id).first()
        if not restaurant_review:
            abort(
                404, message="Error: This restaurant review specified review_id not exists in our database.")
        if args["restaurant_id"]:
            restaurant_review.restaurant_id = args["restaurant_id"]
        if args["review_by"]:
            restaurant_review.review_by = args["review_by"]
        if args["review_content"]:
            restaurant_review.review_content = args["review_content"]
        if args["review_rating"]:
            restaurant_review.review_rating = args["review_rating"]
        if args["is_deleted"]:
            restaurant_review.is_deleted = args["is_deleted"]
        db.session.commit()
        return restaurant_review, 201

    @marshal_with(restaurant_review_resource_field)
    def delete(self, req_id=None):
        if req_id == None:
            abort(
                409, message="Error: restaurant_review_id are required in order to delete review.")
        restaurant_review = Restaurant_Review.query.filter_by(
            id=req_id).first()
        if not restaurant_review:
            abort(
                404, message="Error: This restaurant review specified review_id not exists in our database.")
        restaurant_review = Restaurant_Review.query.filter_by(
            id=req_id).delete()
        db.session.commit()
        return restaurant_review, 201