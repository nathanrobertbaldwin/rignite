from app.models import db, Photo, environment, SCHEMA
from sqlalchemy.sql import text
from .photos_data import photos


def seed_photos():

    for photo in photos:
        new_photo = Photo(product_id=photo["product_id"], url=photo["url"])
        db.session.add(new_photo)

    db.session.commit()

def undo_photos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.photos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM photos"))

    db.session.commit()