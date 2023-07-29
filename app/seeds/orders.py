from app.models import db, Order, environment, SCHEMA
from sqlalchemy.sql import text


def seed_orders():
    order1 = Order(
        user_id=2,
        product_id=1,
        batch_id="0aj9fa09jdfa0f9dj",
        quantity=1,
        order_date="2023-07-20",
        status="pending",
    )

    order2 = Order(
        user_id=2,
        product_id=2,
        batch_id="0aj9fa09jdfa0f9dj",
        quantity=2,
        order_date="2023-07-21",
        status="in transit",
    )

    order3 = Order(
        user_id=2,
        product_id=7,
        batch_id="0aj9fa09jdfa0f9dj",
        quantity=1,
        order_date="2023-07-22",
        status="delivered",
    )

    order4 = Order(
        user_id=3,
        product_id=5,
        batch_id="2f309j203j9f",
        quantity=1,
        order_date="2023-07-23",
        status="pending",
    )

    order5 = Order(
        user_id=3,
        product_id=6,
        batch_id="2f309j203j9f",
        quantity=2,
        order_date="2023-07-24",
        status="in transit",
    )

    order6 = Order(
        user_id=3,
        product_id=7,
        batch_id="2f309j203j9f",
        quantity=1,
        order_date="2023-07-25",
        status="delivered",
    )

    order7 = Order(
        user_id=2,
        product_id=8,
        batch_id="2309fj2093rfs",
        quantity=2,
        order_date="2023-07-26",
        status="pending",
    )

    order8 = Order(
        user_id=2,
        product_id=4,
        batch_id="2309fj2093rfs",
        quantity=2,
        order_date="2023-07-27",
        status="in transit",
    )

    order9 = Order(
        user_id=3,
        product_id=4,
        batch_id="j23kfjfjkg32gh",
        quantity=3,
        order_date="2023-07-28",
        status="delivered",
    )

    order10 = Order(
        user_id=3,
        product_id=1,
        batch_id="32f02fjj0jsg",
        quantity=1,
        order_date="2023-07-29",
        status="pending",
    )

    db.session.add_all(
        [
            order1,
            order2,
            order3,
            order4,
            order5,
            order6,
            order7,
            order8,
            order9,
            order10,
        ]
    )
    db.session.commit()


def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))

    db.session.commit()
