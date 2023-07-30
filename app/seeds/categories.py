from app.models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text


def seed_categories():
    keyboard = Category(
        name="Keyboards",
        photo_url="https://techcrunch.com/wp-content/uploads/2022/06/keychron_q3.jpg",
    )

    mice = Category(
        name="Mice",
        photo_url="https://techcrunch.com/wp-content/uploads/2022/06/keychron_q3.jpg",
    )

    desk_pads = Category(
        name="Gaming Mat",
        photo_url="https://techcrunch.com/wp-content/uploads/2022/06/keychron_q3.jpg",
    )

    speakers = Category(
        name="Speakers",
        photo_url="https://techcrunch.com/wp-content/uploads/2022/06/keychron_q3.jpg",
    )

    headphones = Category(
        name="Headphones",
        photo_url="https://techcrunch.com/wp-content/uploads/2022/06/keychron_q3.jpg",
    )

    db.session.add_all([keyboard, mice, speakers, headphones, desk_pads])

    db.session.commit()


def undo_categories():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM categories"))

    db.session.commit()
