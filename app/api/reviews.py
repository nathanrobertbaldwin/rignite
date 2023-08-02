from flask import Blueprint, request
from ..models import Review, Product, db
from ..forms.review_form import ReviewForm
from ..forms.edit_review import EditReviewForm
from flask_login import current_user, login_required

reviews = Blueprint("reviews", __name__)

@reviews.route("/")
@login_required
def getAllUserReviews():
    all_user_reviews_query = Review.query.filter(Review.user_id == current_user.id)

    user_reviews_to_dict = [review.to_dict() for review in all_user_reviews_query]
    return user_reviews_to_dict

@reviews.route("/new", methods=["POST"])
@login_required
def create_review():

    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_review = Review(
            user_id = form.data["user_id"],
            product_id = form.data["product_id"],
            review = form.data["review"],
            rating = form.data["rating"],
            photo_url = form.data["photo_url"]
        )

        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()
    else:
        return { "errors": form.errors }


@reviews.route("/<int:reviewId>", methods=["PUT"])
@login_required
def edit_review(reviewId):

    review = Review.query.get(reviewId)

    form = EditReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():

        review.review = form.data["review"]
        review.rating = form.data["rating"]
        review.photo_url = form.data["photo_url"]

        db.session.add(review)
        db.session.commit()

        return review.to_dict()

    else:
        return {"errors": form.errors}
