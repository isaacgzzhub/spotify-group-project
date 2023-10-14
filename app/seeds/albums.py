from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text


def seed_albums():
    album1 = Album(user_id=1, album_name='Barbie', thumbnail='super_cool_thing.jpg', release_year=2023)
    db.session.add(album1)
    album2 = Album(user_id=2, album_name='Greatest Hits', thumbnail='greatest_hits_cover.jpg', release_year=2019)
    db.session.add(album2)
    album3 = Album(user_id=3, album_name='Love Songs', thumbnail='love_songs_cover.jpg', release_year=2015)
    db.session.add(album3)
    album4 = Album(user_id=1, album_name='Party Anthems', thumbnail='party_anthems_cover.jpg', release_year=2018)
    db.session.add(album4)
    album5 = Album(user_id=2, album_name='Chill Vibes', thumbnail='chill_vibes_cover.jpg', release_year=2017)
    db.session.add(album5)
    album6 = Album(user_id=3, album_name='Acoustic Sessions', thumbnail='acoustic_sessions_cover.jpg', release_year=2016)
    db.session.add(album6)
    album7 = Album(user_id=1, album_name='Rock Classics', thumbnail='rock_classics_cover.jpg', release_year=2014)
    db.session.add(album7)
    album8 = Album(user_id=4, album_name='Hip-Hop Hits', thumbnail='hip_hop_hits_cover.jpg', release_year=2019)
    db.session.add(album8)
    album9 = Album(user_id=2, album_name='Country Road', thumbnail='country_road_cover.jpg', release_year=2015)
    db.session.add(album9)
    album10 = Album(user_id=3, album_name='Pop Sensations', thumbnail='pop_sensations_cover.jpg', release_year=2017)
    db.session.add(album10)

    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the songs table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))

    db.session.commit()
