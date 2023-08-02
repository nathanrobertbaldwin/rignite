from .db import db, environment, SCHEMA, add_prefix_for_prod


order_status = ["pending", "in transit", "delivered"]


class Order(db.Model):
    __tablename__ = "orders"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    # id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True)
    product_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")),
        primary_key=True
    )
    batch_id = db.Column(db.String(100), nullable=False, unique=True)
    quantity = db.Column(db.Integer, nullable=False)
    order_date = db.Column(db.String(50), nullable=False)
    status = db.Column(db.Enum(*order_status, name="status_enum"), nullable=False)

    order_product = db.relationship("Product")

    def order_details_to_dict(self):
        return {
            # "id": self.id,
            "user_id": self.user_id,
            # "order_customer": {
            #     "first_name": self.order_customer.first_name,
            #     "last_name": self.order_customer.last_name,
            # },
            "product_id": self.product_id,
            "order_product": self.order_product.product_details_to_dict(),
            "batch_id": self.batch_id,
            "quantity": self.quantity,
            "order_date": self.order_date,
            "status": self.status,
        }

    def order_to_dict_pre_commit(self):
        return {
            # "id": self.id,
            "user_id": self.user_id,
            "product_id": self.product_id,
            "batch_id": self.batch_id,
            "quantity": self.quantity,
            "order_date": self.order_date,
            "status": self.status,
            # "order_customer": self.order_customer.customer_basic_info_to_dict(),
        }
