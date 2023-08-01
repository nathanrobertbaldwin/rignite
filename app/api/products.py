from flask import Blueprint, request
from ..models import Product, Photo, db
from ..forms.products_form import ProductForm

products = Blueprint("products", __name__)


# user clicks on Shop button
# GET /api/products/all
@products.route("/all")
def get_all_products():
    products = Product.query.all()
    return [product.product_details_to_dict() for product in products]


@products.route("/new", methods=["POST"])
def new_product():
    form = ProductForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        new_product = Product(
            product_name=data["product_name"],
            price=data["price"],
            category_id=data["category_id"],
            brand=data["brand"],
            color=data["color"],
            description=data["description"],
            specs=data["specs"],
        )
        photo1 = Photo(product_id=data[new_product.id], url=data["imageOne"])

        if data["imageTwo"]:
            photo2 = Photo(product_id=data[new_product.id], url=data["imageTwo"])
        if data["imageThree"]:
            photo3 = Photo(product_id=data[new_product.id], url=data["imageThree"])
        if data["imageFour"]:
            photo4 = Photo(product_id=data[new_product.id], url=data["imageFour"])

        db.session.add(new_product)
        db.session.commit()
        return new_product.product_details_to_dict()

    if form.errors:
        return form.errors
