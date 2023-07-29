from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    admin = User(
        username="admin",
        email="admin@rignite.com",
        first_name="John",
        last_name="Doe",
        address="123 Main Street",
        city="New York City",
        state="New York",
        zip_code=10001,
        is_admin=True,
        password="password",
    )

    user1 = User(
        username="user1",
        email="user1@google.com",
        first_name="Bob",
        last_name="User",
        address="999 Whatever Road",
        city="Whatever",
        state="Nevada",
        zip_code=11111,
        is_admin=False,
        password="password",
    )

    user2 = User(
        username="user2",
        email="user2@yahoo.com",
        first_name="Jim",
        last_name="User",
        address="Town",
        city="Pennsylvania",
        state="New York",
        zip_code=22222,
        is_admin=False,
        password="password",
    )

    db.session.add_all([admin, user1, user2])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
