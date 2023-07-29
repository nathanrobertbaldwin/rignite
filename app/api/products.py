from flask import Blueprint, jsonify
from ..models import Product, db

products = Blueprint("products", __name__)


# user clicks on Shop button
# GET /api/products/all
@products.route("/all")
def get_all_products():
    print("ARE WE HEREHEHEHHE")
    products = Product.query.all()
    return [product.product_details_to_dict() for product in products]
