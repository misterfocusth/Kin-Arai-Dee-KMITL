from ..models import db, RandomResult, Menu
from flask_restful import Resource, abort, reqparse, marshal_with, fields
import random

resource_field = {
    "id": fields.Integer,
    "random_by": fields.Integer,
    "random_menu_name": fields.String,
    "random_menu_id": fields.Integer,
    "random_restaurant_name": fields.String,
    "random_restaurant_id": fields.Integer,
    "random_category_name": fields.String,
    "random_category_id": fields.Integer,
    "random_date": fields.DateTime,
    "is_deleted": fields.Boolean
}


random_add_args = reqparse.RequestParser()
random_add_args.add_argument("random_by", type=int, required=False,
                             help="[Request Parser]: Args: random_by < Must be integer or not empty.")
random_add_args.add_argument("random_category_id", type=int,
                             help="[Request Parser]: Args: random_category_id < Must be integer.")


class RandomRoute(Resource):
    @marshal_with(resource_field)
    def get(self, req_random_id=None, req_random_by=None):
        try:
            if req_random_id != None:
                random_menu = RandomResult.query.filter_by(
                    id=req_random_id).first()
                if not random_menu:
                    abort(
                        404, message="Error: This random result with specified random_id not exists in our database.")
                return random_menu
            if req_random_by != None:
                random_menu_by_user = RandomResult.query.filter_by(
                    random_by=req_random_by).all()
                return random_menu_by_user
            random_menus = RandomResult.query.all()
            return random_menus
        finally:
            db.session.close()

    @marshal_with(resource_field)
    def post(self):
        args = random_add_args.parse_args()
        random_category_id = args["random_category_id"]
        available_menu = None
        max_random_times = 10

        while max_random_times > 0:
            if random_category_id:
                available_menu = Menu.query.filter_by(
                    category_id=random_category_id, is_deleted=False).all()
            else:
                available_menu = Menu.query.filter_by(is_deleted=False).all()

            if len(available_menu) == 1:
                random_menu_id = 1
            else:
                random_menu_id = random.randint(0, len(available_menu))
            random_menu = Menu.query.filter_by(
                id=random_menu_id, is_deleted=False).first()

            if random_menu:
                break
            else:
                max_random_times -= 1
                if max_random_times == 0:
                    abort(404)
                continue

        random_result = RandomResult(
            random_by=args["random_by"],
            random_menu_id=random_menu.id,
            random_restaurant_id=random_menu.restaurant_id,
            random_category_id=random_menu.category_id,
            random_menu_name=random_menu.name,
            random_restaurant_name=random_menu.restaurant_name,
            random_category_name=random_menu.category
        )

        db.session.add(random_result)
        db.session.commit()

        return random_result
