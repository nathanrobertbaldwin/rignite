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
            user_id=data["user_id"],
            product_name=data["product_name"],
            price=data["price"],
            category_id=data["category_id"],
            brand=data["brand"],
            color=data["color"],
            description=data["description"],
            specs=data["specs"],
            status="active"
        )

        db.session.add(new_product)
        db.session.commit()

        photo1 = Photo(product_id=new_product.id, url=data["imageOne"])
        new_photos = []
        new_photos.append(photo1)

        if data["imageTwo"]:
            photo2 = Photo(product_id=new_product.id, url=data["imageTwo"])
            new_photos.append(photo2)
        if data["imageThree"]:
            photo3 = Photo(product_id=new_product.id, url=data["imageThree"])
            new_photos.append(photo3)
        if data["imageFour"]:
            photo4 = Photo(product_id=new_product.id, url=data["imageFour"])
            new_photos.append(photo4)

        db.session.add_all([*new_photos])
        db.session.commit()

        return new_product.product_details_to_dict()

    if form.errors:
        return form.errors


@products.route("/<productId>", methods=["PATCH"])
def edit_product(productId):
    form = ProductForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data

        product = Product.query.get(productId)

        product.product_name = data["product_name"]
        product.price = data["price"]
        product.category_id = data["category_id"]
        product.brand = data["brand"]
        product.color = data["color"]
        product.description = data["description"]
        product.specs = data["specs"]
        product.status = data["status"]

        db.session.commit()

        photos_to_delete = Photo.query.filter_by(product_id=productId).all()

        for photo in photos_to_delete:
            db.session.delete(photo)
        db.session.commit()

        photo1 = Photo(product_id=productId, url=data["imageOne"])

        new_photos = []
        new_photos.append(photo1)

        if data["imageTwo"]:
            photo2 = Photo(product_id=productId, url=data["imageTwo"])
            new_photos.append(photo2)
        if data["imageThree"]:
            photo3 = Photo(product_id=productId, url=data["imageThree"])
            new_photos.append(photo3)
        if data["imageFour"]:
            photo4 = Photo(product_id=productId, url=data["imageFour"])
            new_photos.append(photo4)

        db.session.add_all([*new_photos])
        db.session.commit()

        return product.product_details_to_dict()

    if form.errors:
        return form.errors
