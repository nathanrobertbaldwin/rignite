from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text


def seed_reviews():
    review1 = Review(
        user_id=2,
        product_id=1,
        review="I purchased this with the intent of using the board for a bulbasaur keyboard build. The switches are clacky and I hate it. I prefer thocky sounds, and I could get over the sound if it was good to type on - but I find it to be lackluster.",
        rating=5,
        photo_url="https://massdrop-s3.imgix.net/product-images/drop-alt-mechanical-keyboard/FP/RMbYJqPsTGWTzByTDekj_1324-copy-pdp.jpg",
    )

    review2 = Review(
        user_id=3,
        product_id=8,
        review="From the painless ordering process to making sure that the product arrived on time professionally packaged, along with an invoice to the actual product itself - the HD 6XX - Wow! I have been listening to music for over 40 years and have never heard my music like this before.",
        rating=4,
        photo_url="https://massdrop-s3.imgix.net/product-images/massdrop-x-sennheiser-hd-58x-jubilee-headphones/FP/jbCgVcPdRXZC1YRI2oZ3_3qKeFvWGRbQ3wreRhIVc_58x_clear.png",
    )

    review3 = Review(
        user_id=2,
        product_id=5,
        review="This deskmat was a massive upgrade from my previous light-up desk mat. The materials are very high quality. Its stable with no sliding and it has a little bit of a bounce to it which gives a really good typing experience depending on how hard you type.",
        rating=2,
        photo_url=None,
    )

    review4 = Review(
        user_id=2,
        product_id=8,
        review="Ordered the gray, halo true version. It looks fantastic. I love the keycaps and the RGB diffuser - it's a rainbow sandwich. I love the key layout, matches closely to Glorious GMMK2 65%, it's concise and looks great. I also like the dual usb c port on either side, it's convenient.",
        rating=3,
        photo_url="https://massdrop-s3.imgix.net/product-images/drop-sense75-mechanical-keyboard/FP/TtZmXWcuSsqONbYUENLo_PC.png",
    )

    review5 = Review(
        user_id=3,
        product_id=8,
        review="Showcasing a thoughtfully engineered open-back design, the GSP 500 headset from EPOS delivers high-fidelity audio that makes your video games sound like the real thing.",
        rating=5,
        photo_url=None,
    )

    review6 = Review(
        user_id=3,
        product_id=3,
        review="I originally bought a G502 around 5-6 years back, while I'm not a fan of Logitech keyboards, this mouse has been a rockstar. My original finally gave up the ghost last week, it started double left clicking or failing to left click (Yes, I could probably disassemble, clean and fix it but eh). I thought I'd upgrade by buying a Corsair Dark Orb SE (Qi edition), I've had that mouse for 4 days now.",
        rating=3,
        photo_url="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6265/6265133_sd.jpg",
    )

    review7 = Review(
        user_id=2,
        product_id=7,
        review="Really good desk speakers that have a weird quirk. I can occasionally hear some crackling sounds from the speakers. But it only happens sometimes, and has overall my experience has been great.",
        rating=2,
        photo_url=None,
    )

    review8 = Review(
        user_id=2,
        product_id=8,
        review="Little nuances that were never heard before come out here. Not like hearing it for the first time, but like hearing a different mix of the same song.  Very impressive Drop, please give yourselves a big hand for making these beautiful headphones even more available for all to enjoy!",
        rating=3,
        photo_url="https://massdrop-s3.imgix.net/product-images/epos-sennheiser-gsp-500-wired-open-back-gaming-headset/FP/VOTt2hXvRE60fuwdotmZ_pc.png",
    )

    review9 = Review(
        user_id=3,
        product_id=6,
        review="Comfortably covers enough of my desk, I appreciate I can set down my metal cups and my keyboard on it without worrying that I'll dent or scratch my wood desk. And definitely feels nice using my mouse on..",
        rating=4,
        photo_url=None,
    )

    review10 = Review(
        user_id=2,
        product_id=1,
        review="Day one of using this keyboard, it worked perfectly. I loved the LEDs, the feel of the MX Browns, just about everything about this keyboard seemed perfect compared to my previous keyboard.",
        rating=4,
        photo_url="https://massdrop-s3.imgix.net/product-images/drop-paragon-series-snoboard/FP/EoycBX5SjW0lWeWSY6op_PC.png",
    )

    db.session.add_all(
        [
            review1,
            review2,
            review3,
            review4,
            review5,
            review6,
            review7,
            review8,
            review9,
            review10,
        ]
    )
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
