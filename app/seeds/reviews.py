from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from .review_data import reviews

def seed_reviews():
    for review in reviews:
        new_review = Review(
            user_id=review["user_id"],
            product_id=review["product_id"],
            review=review["review"],
            rating=review["rating"],
            photo_url=review["photo_url"]
        )
        db.session.add(new_review)
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
