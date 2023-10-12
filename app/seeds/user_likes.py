from app.models import db, UserLike, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other songs here if you want
def seed_user_likes():
    user_like1 = UserLike(user_id=1, song_id=1)
    db.session.add(user_like1)
    user_like2 = UserLike(user_id=2, song_id=2)
    db.session.add(user_like2)
    user_like3 = UserLike(user_id=1, song_id=3)
    db.session.add(user_like3)
    user_like4 = UserLike(user_id=3, song_id=4)
    db.session.add(user_like4)
    user_like5 = UserLike(user_id=2, song_id=5)
    db.session.add(user_like5)
    user_like6 = UserLike(user_id=4, song_id=6)
    db.session.add(user_like6)
    user_like7 = UserLike(user_id=3, song_id=7)
    db.session.add(user_like7)
    user_like8 = UserLike(user_id=4, song_id=8)
    db.session.add(user_like8)
    user_like9 = UserLike(user_id=1, song_id=9)
    db.session.add(user_like9)
    user_like10 = UserLike(user_id=2, song_id=10)
    db.session.add(user_like10)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the songs table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_user_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_likes"))

    db.session.commit()
