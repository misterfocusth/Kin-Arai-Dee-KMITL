from sqlalchemy import func
from sqlalchemy.sql import expression
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(150), nullable=False)
    profile_picture_url = db.Column(db.String(255), default="")
    display_name = db.Column(db.String(150), nullable=False, default="")
    is_accepted_terms = db.Column(db.Boolean, default=False)
    is_accepted_pdpa = db.Column(db.Boolean, default=False)
    is_deleted = db.Column(db.Boolean, nullable=False, default=False)

    def __repr__(self):
        return f"User(user_id={self.user_id}, profile_picture_url={self.profile_picture_url}, display_name={self.display_name}, is_accepted_terms={self.is_accepted_terms}, is_accepted_pdpa={self.is_accepted_pdpa}, is_deleted={self.is_deleted})"


class RestaurantReview(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, nullable=False)
    review_by = db.Column(db.Integer, nullable=False)
    review_content = db.Column(db.String(255), nullable=False)
    review_rating = db.Column(db.Integer, nullable=False)
    review_date = db.Column(db.DateTime(timezone=True), default=func.now())
    is_deleted = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f"RestaurantReview(restaurant_id={self.restaurant_id}, review_by={self.review_by}, review_content={self.review_content}, review_rating={self.review_rating}, review_date={self.review_date}, is_deleted={self.is_deleted})"


class Restaurant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(255), nullable=False)
    category_id = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    is_deleted = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f"Restaurant(name={self.name}, location={self.location}, phone_number={self.phone_number}, category={self.category}, image_url={self.image_url}, category_id={self.category_id}, is_deleted={self.is_deleted})"


class MenuReview(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    menu_id = db.Column(db.Integer, nullable=False)
    review_by = db.Column(db.Integer, nullable=False)
    review_content = db.Column(db.String(255), nullable=False)
    review_rating = db.Column(db.Integer, nullable=False)
    review_date = db.Column(db.DateTime(timezone=True), default=func.now())
    is_deleted = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f"MenuReview(menu_id={self.menu_id}, review_by={self.review_by}, review_content={self.review_content}, review_rating={self.review_rating}, review_date={self.review_date}, is_deleted={self.is_deleted})"


class Menu(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    category = db.Column(db.String(255), nullable=False)
    category_id = db.Column(db.Integer, nullable=False)
    restaurant_name = db.Column(db.String(255), nullable=False)
    restaurant_location = db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    restaurant_id = db.Column(db.Integer, nullable=False)
    is_deleted = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f"Menu(name={self.name}, price={self.price}, category={self.category}, restaurant_name={self.restaurant_name}, restaurant_location={self.restaurant_location}, image_url={self.image_url}, restaurant_id={self.restaurant_id}, category_id={self.category_id}, is_deleted={self.is_deleted})"


class RandomResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    random_by = db.Column(db.Integer, nullable=False)
    random_menu_id = db.Column(db.Integer, nullable=False)
    random_restaurant_id = db.Column(db.Integer, nullable=False)
    random_category_id = db.Column(db.Integer, nullable=False)
    random_date = db.Column(db.DateTime(timezone=True), default=func.now())
    is_deleted = db.Column(db.Boolean, default=False)
    random_menu_name = db.Column(db.String(255), nullable=False)
    random_restaurant_name = db.Column(db.String(255), nullable=False)
    random_category_name = db.Column(db.String(255), nullable=False)
    random_menu_image_url = db.Column(db.String(255), nullable=False)
    random_menu_price = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"RandomResult(random_by={self.random_by}, random_menu_id={self.random_menu_id}, random_restaurant_id={self.random_restaurant_id}, random_category_id={self.random_category_id}, random_date={self.random_date}, is_deleted={self.is_deleted}, random_menu_name={self.random_menu_name}, random_restaurant_name={self.random_restaurant_name}, random_category_name={self.random_category_name}, random_menu_image_url={self.random_menu_image_url} random_menu_price={self.random_menu_price})"
