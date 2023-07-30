from flask import Blueprint
from ..models import Product

products = Blueprint("products", __name__)


# user clicks on Shop button
# GET /api/products/all
@products.route("/all")
def get_all_products():
    products = Product.query.all()
    return [product.product_details_to_dict() for product in products]
