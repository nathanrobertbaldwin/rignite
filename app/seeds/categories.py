from app.models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text


def seed_categories():
    keyboard = Category(
        name="Keyboards",
        photo_url="https://prosettings.net/cdn-cgi/image/dpr=1%2Cf=auto%2Cfit=cover%2Cheight=500%2Cq=85%2Cwidth=1000/wp-content/uploads/keyboard-size-differences-explained-1.png",
    )

    mice = Category(
        name="Mice",
        photo_url="https://c4.wallpaperflare.com/wallpaper/28/400/999/razer-computer-mice-wallpaper-preview.jpg",
    )

    desk_pads = Category(
        name="Gaming Mat",
        photo_url="https://stackskb.com/wp-content/uploads/2021/08/koshitsu.jpg",
    )

    speakers = Category(
        name="Speakers",
        photo_url="https://i.ebayimg.com/images/g/8LYAAOSwZOZhf4~z/s-l500.jpg",
    )

    headphones = Category(
        name="Headphones",
        photo_url="https://media.wired.com/photos/63e69de969cf98bf35404277/1:1/w_1278,h_1278,c_limit/Best-Wireless-Headphones-Featured-Focal-Bathys-Gear.jpg",
    )

    db.session.add_all([keyboard, mice, desk_pads, speakers, headphones])

    db.session.commit()


def undo_categories():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM categories"))

    db.session.commit()
