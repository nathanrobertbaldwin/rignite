import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from .models import db, User, Product, Review, Photo, Order

from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.products import products
from .api.categories import categories
from .api.orders import orders
from .api.reviews import reviews
from .api.images import images

from .seeds import seed_commands
from .config import Config

app = Flask(__name__, static_folder="../react-app/build", static_url_path="/")

# Setup login manager
login = LoginManager(app)
login.login_view = "auth.unauthorized"


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix="/api/users")
app.register_blueprint(auth_routes, url_prefix="/api/auth")
app.register_blueprint(products, url_prefix="/api/products")
app.register_blueprint(categories, url_prefix="/api/categories")
app.register_blueprint(orders, url_prefix="/api/orders")
app.register_blueprint(reviews, url_prefix="/api/reviews")
app.register_blueprint(images, url_prefix="/api/reviews")

db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........


# @app.route("/6")
# def test6():
#     # ========= Get all users who aren't admins =========
#     admins = User.query.filter(User.is_admin == True)
#     return [admin.admins_query_all_to_dict() for admin in admins]


# @app.route("/1")
# def test1():
#     # ========= Get all users who aren't admins =========
#     customers = User.query.filter(User.is_admin == False)
#     return [customer.customers_query_all_to_dict() for customer in customers]


# @app.route("/2")
# def test2():
#     # ========= Get details for all orders =========
#     orders = Order.query.all()
#     return [order.order_details_to_dict() for order in orders]


# @app.route("/3")
# def test3():
#     # ========= Get all orders in an order batch =========
#     orders = Order.query.filter(Order.batch_id == "0aj9fa09jdfa0f9dj")
#     return [order.order_by_batch_id_to_dict() for order in orders]


# @app.route("/4")
# def test4():
#     # ========= Get all products =========
#     products = Product.query.all()
#     return [product.product_details_to_dict() for product in products]


# @app.route("/5")
# def test5():
#     # ========= Get all reviews on a product by product.id =========
#     product = Product.query.get(1)
#     return product.reviews_for_product()


@app.before_request
def https_redirect():
    if os.environ.get("FLASK_ENV") == "production":
        if request.headers.get("X-Forwarded-Proto") == "http":
            url = request.url.replace("http://", "https://", 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        "csrf_token",
        generate_csrf(),
        secure=True if os.environ.get("FLASK_ENV") == "production" else False,
        samesite="Strict" if os.environ.get("FLASK_ENV") == "production" else None,
        httponly=True,
    )
    return response


@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    route_list = {
        rule.rule: [
            [method for method in rule.methods if method in acceptable_methods],
            app.view_functions[rule.endpoint].__doc__,
        ]
        for rule in app.url_map.iter_rules()
        if rule.endpoint != "static"
    }
    return route_list


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    if path == "favicon.ico":
        return app.send_from_directory("public", "logo_transparent.png")
    return app.send_static_file("index.html")


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file("index.html")
