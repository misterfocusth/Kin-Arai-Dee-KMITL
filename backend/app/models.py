from sqlalchemy import func
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(150), unique=True, nullable=False)
    profile_picture_url = db.Column(db.String(255), default="")
    display_name = db.Column(db.String(150), nullable=False, default="")
    is_accepted_terms = db.Column(db.Boolean, default=False)
    is_accepted_pdpa = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f"User(user_id={self.user_id}, profile_picture_url={self.profile_picture_url}, display_name={self.display_name}, is_accepted_terms={self.is_accepted_terms}, is_accepted_pdpa={self.is_accepted_pdpa})"


class Restaurant_Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, primary_key=True)
    review_by = db.Column(db.String(255), nullable=False)
    review_content = db.Column(db.String(255), nullable=False)
    review_rating = db.Column(db.Integer, nullable=False)
    review_date = db.Column(db.DateTime(timezone=True), default=func.now())
    is_deleted = db.Column(db.Boolean, default=False)


class Restaurant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(255), nullable=False)


class Menu_Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    menu_id = db.Column(db.Integer, primary_key=True)
    review_by = db.Column(db.String(255), nullable=False)
    review_content = db.Column(db.String(255), nullable=False)
    review_rating = db.Column(db.Integer, nullable=False)
    review_date = db.Column(db.DateTime(timezone=True), default=func.now())
    is_deleted = db.Column(db.Boolean, default=False)


class Menu(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), primary_key=True)
    price = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(255), nullable=False)
    restaurant_name = db.Column(db.String(255), nullable=False)
    restaurant_location = db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.Boolean, default=False)
