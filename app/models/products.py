from .db import db, environment, SCHEMA, add_prefix_for_prod
from .orders import Order

product_status = ['active', 'sold out', 'deactivated']

class Product(db.Model):
    __tablename__ = "products"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    product_name = db.Column(db.String(50), nullable=False)
    category_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("categories.id"))
    )
    price = db.Column(db.Numeric(scale=2), nullable=False)
    brand = db.Column(db.String(50), nullable=False)
    color = db.Column(db.String(50), nullable=True)
    description = db.Column(db.Text, nullable=False)
    specs = db.Column(db.Text, nullable=False)
    status = db.Column(db.Enum(*product_status, name='status_enum2'), nullable=False)

    product_orders = db.relationship("Order")

    product_reviews = db.relationship("Review", backref="product")

    product_photos = db.relationship("Photo", backref="product")

    def product_details_to_dict(self):
        return {
            "id": self.id,
            "admin_id": self.user_id,
            "product_name": self.product_name,
            "category_id": self.category_id,
            "price": self.price,
            "brand": self.brand,
            "color": self.color,
            "description": self.description,
            "specs": self.specs,
            "product_photos": [photo.to_dict() for photo in self.product_photos],
            "product_reviews": [review.to_dict() for review in self.product_reviews],
        }

    # def reviews_for_product(self):
    #     return {
    #         "id": self.id,
    #         "product_name": self.product_name,
    #         "product_reviews": [review.to_dict() for review in self.product_reviews],
    #     }
