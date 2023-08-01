from flask import Blueprint, request
from ..models import Review, db
from ..forms.review_form import ReviewForm
from flask_login import current_user, login_required

reviews = Blueprint("reviews", __name__)

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
