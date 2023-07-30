from flask import Blueprint, jsonify
from ..models import Review, db

reviews = Blueprint("reviews", __name__)


# getall reviews when user clicks on a product for details
# GET /api/reviews/all
@reviews.route("/all")
def get_product_reviews():
    reviews = Review.query.all()
    return [review.to_dict() for review in reviews]
