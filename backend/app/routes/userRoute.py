from ..models import db, User
from flask_restful import Resource, abort, reqparse, marshal_with, fields

resource_field = {
    "id": fields.Integer,
    "user_id": fields.String,
    "profile_picture_url": fields.String,
    "display_name": fields.String,
    "is_accepted_terms": fields.Boolean,
    "is_accepted_pdpa": fields.Boolean
}

user_add_args = reqparse.RequestParser()
user_add_args.add_argument("user_id", type=str, required=True,
                           help="[Request Parser]: Args: user_id < Must be string or not empty.")
user_add_args.add_argument("profile_picture_url", type=str, required=True,
                           help="[Request Parser]: Args: profile_picture_url < Must be string or not empty.")
user_add_args.add_argument("display_name", type=str, required=True,
                           help="[Request Parser]: Args: display_name < Must be string or not empty.")
user_add_args.add_argument("is_accepted_terms", type=bool, required=True,
                           help="[Request Parser]: Args: is_accepted_terms < Must be boolean or not empty.")
user_add_args.add_argument("is_accepted_pdpa", type=bool, required=True,
                           help="[Request Parser]: Args: is_accepted_pdpa < Must be boolean or not empty.")

user_update_args = reqparse.RequestParser()
user_update_args.add_argument("user_id", type=str,
                              help="[Request Parser]: Args: user_id < Must be string.")
user_update_args.add_argument("profile_picture_url", type=str,
                              help="[Request Parser]: Args: profile_picture_url < Must be string.")
user_update_args.add_argument("display_name", type=str,
                              help="[Request Parser]: Args: display_name < Must be string.")
user_update_args.add_argument("is_accepted_terms", type=bool,
                              help="[Request Parser]: Args: is_accepted_terms < Must be boolean.")
user_update_args.add_argument("is_accepted_pdpa", type=bool,
                              help="[Request Parser]: Args: is_accepted_pdpa < Must be boolean.")


class UserRoute(Resource):
    @marshal_with(resource_field)
    def get(self, req_id=None):
        if req_id == None:
            users = User.query.all()
            return users
        user = User.query.filter_by(id=req_id).first()
        if not user:
            abort(
                404, message="Error: This user with specified user_id not exists in our database.")
        return user

    @marshal_with(resource_field)
    def post(self):
        args = user_add_args.parse_args()
        user_id = args["user_id"]
        user = User.query.filter_by(user_id=user_id).first()
        if user:
            abort(409, message="Error: Current city_id are already exists in database.")
        user = User(
            user_id=args["user_id"],
            profile_picture_url=args["profile_picture_url"],
            display_name=args["display_name"],
            is_accepted_terms=args["is_accepted_terms"],
            is_accepted_pdpa=args["is_accepted_pdpa"]
        )
        db.session.add(user)
        db.session.commit()
        return user, 201

    @marshal_with(resource_field)
    def patch(self, req_id):
        args = user_update_args.parse_args()
        user = User.query.filter_by(id=req_id).first()
        if not user:
            abort(
                404, "Error: This user with specified user_id not exists in our database.")
        if args["user_id"]:
            user.user_id = args["user_id"]
        if args["profile_picture_url"]:
            user.profile_picture_url = args["profile_picture_url"]
        if args["display_name"]:
            user.display_name = args["display_name"]
        if args["is_accepted_terms"]:
            user.is_accepted_terms = args["is_accepted_terms"]
        if args["is_accepted_pdpa"]:
            user.is_accepted_pdpa = args["is_accepted_pdpa"]
        db.session.commit()
        return user, 201
