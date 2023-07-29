from .db import db, environment, SCHEMA, add_prefix_for_prod


class Photo(db.Model):
    __tablename__ = "photos"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("products.id"))
    )
    url = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "url": self.url,
        }
