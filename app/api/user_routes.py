from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..models import User, db
from app.forms import ManageForm

user_routes = Blueprint("users", __name__)


@user_routes.route("/")
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}

@user_routes.route("/manage", methods=["PUT"])
@login_required
def manage_account():
    """
    Logged in Users can manage their account on a separate my profile page.
    User can edit their information.
    """

    # this isnt coming from User table directly, need to run a query from the actual User table to save changes
    curr_user_id = current_user.to_dict()["id"]
    user = User.query.get(curr_user_id)

    form = ManageForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        # YOU NEED TO USE DOT NOTATION, OTHERWISE YOU GET A TYPE ERROR: "USER" OBJECT NOT SUBSCRIPTABLE
        user.address = form.data["address"]
        user.email = form.data["email"]
        user.first_name = form.data["first_name"]
        user.last_name = form.data["last_name"]
        user.address = form.data["address"]
        user.city = form.data["city"]
        user.state = form.data["state"]
        user.zip_code = form.data["zip_code"]
        user.password = form.data["password"]

        db.session.commit()
        return user.to_dict()

    else:
        return form.errors

@user_routes.route("/<int:id>")
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()
