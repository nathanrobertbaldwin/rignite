from flask import Blueprint
from ..models import Category

categories = Blueprint("categories", __name__)


# user navigates to categories index page.
# GET /api/categories/all
@categories.route("/all")
def get_all_categories():
    categories = Category.query.all()
    return [category.to_dict() for category in categories]