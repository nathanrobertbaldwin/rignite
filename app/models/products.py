from .db import db, environment, SCHEMA, add_prefix_for_prod
from .orders import Order


class Product(db.Model):
    __tablename__ = "products"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    product_name = db.Column(db.String(50), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Numeric(scale=2), nullable=False)
    brand = db.Column(db.String(50), nullable=False)
    color = db.Column(db.String(50), nullable=True)
    description = db.Column(db.Text, nullable=False)
    specs = db.Column(db.Text, nullable=False)

    product_orders = db.relationship(
        "User", secondary=Order.__tablename__, back_populates="user_orders"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "admin_id": self.user_id,
            "product_name": self.product_name,
            "category": self.category,
            "price": self.price,
            "brand": self.brand,
            "color": self.color,
            "description": self.description,
            "specs": self.specs,
        }