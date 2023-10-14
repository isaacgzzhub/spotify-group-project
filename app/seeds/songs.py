from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text


def seed_songs():
    song1 = Song(user_id=1, album_id=1, song_name='Barbie Girl', seconds=180, song_content='kaljsdfljsdlfjdlfa.mp3', release_year=2023)
    db.session.add(song1)

    song2 = Song(user_id=2, album_id=1, song_name='Shape of You', seconds=210, song_content='asldfjlkajsdf.mp3', release_year=2017)
    db.session.add(song2)

    song3 = Song(user_id=1, album_id=2, song_name='Bohemian Rhapsody', seconds=354, song_content='alksdfjalsdf.mp3', release_year=1975)
    db.session.add(song3)

    song4 = Song(user_id=3, album_id=2, song_name='Rolling in the Deep', seconds=228, song_content='alksdjflajsd.mp3', release_year=2010)
    db.session.add(song4)

    song5 = Song(user_id=2, album_id=3, song_name='Uptown Funk', seconds=270, song_content='asldkfjasldf.mp3', release_year=2014)
    db.session.add(song5)

    song6 = Song(user_id=4, album_id=3, song_name='Shape of My Heart', seconds=245, song_content='alsdfjalskdf.mp3', release_year=1993)
    db.session.add(song6)

    song7 = Song(user_id=3, album_id=1, song_name='Billie Jean', seconds=294, song_content='alksjdfalkjdf.mp3', release_year=1982)
    db.session.add(song7)

    song8 = Song(user_id=4, album_id=4, song_name='Despacito', seconds=228, song_content='alksjdflakjsdf.mp3', release_year=2017)
    db.session.add(song8)

    song9 = Song(user_id=1, album_id=5, song_name='Can\'t Stop the Feeling!', seconds=236, song_content='alksdjflkajsdf.mp3', release_year=2016)
    db.session.add(song9)

    song10 = Song(user_id=2, album_id=5, song_name='Shape of You', seconds=230, song_content='alskjdfalksjdf.mp3', release_year=2017)
    db.session.add(song10)

    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the songs table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
