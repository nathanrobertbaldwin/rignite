from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text
from .prod_data import products


def seed_products():
    for product in products:
        new_prod = Product(
        user_id=product['user_id'],
        brand=product['brand'],
        category_id=product['category_id'],
        color=product['color'],
        description=product['description'],
        price=product['price'],
        product_name=product['product_name'],
        specs=product['specs'],
        status='active'
        )
        db.session.add(new_prod)
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
