from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text


def seed_songs():
    song1 = Song(user_id=1, album_id=1, song_name='Barbie Girl', thumbnail_url='https://marketplace.canva.com/EAFOuq-KTcI/1/0/1600w/canva-dark-aesthetic-minimalist-lofi-music-youtube-thumbnail-UIfznurLbPw.jpg', seconds=180, song_url='kaljsdfljsdlfjdlfa.mp3', release_year=2023)
    db.session.add(song1)

    song2 = Song(user_id=2, album_id=1, song_name='Shape of You', thumbnail_url='https://media.bazaart.me/at/8d1778d5-ded0-4573-8a16-a404770720cb.jpg', seconds=210, song_url='asldfjlkajsdf.mp3', release_year=2017)
    db.session.add(song2)

    song3 = Song(user_id=1, album_id=2, song_name='Bohemian Rhapsody', thumbnail_url='https://marketplace.canva.com/EAFOuq-KTcI/1/0/1600w/canva-dark-aesthetic-minimalist-lofi-music-youtube-thumbnail-UIfznurLbPw.jpg', seconds=354, song_url='alksdfjalsdf.mp3', release_year=1975)
    db.session.add(song3)

    song4 = Song(user_id=3, album_id=2, song_name='Rolling in the Deep', thumbnail_url='https://media.bazaart.me/at/8d1778d5-ded0-4573-8a16-a404770720cb.jpg', seconds=228, song_url='alksdjflajsd.mp3', release_year=2010)
    db.session.add(song4)

    song5 = Song(user_id=2, album_id=3, song_name='Uptown Funk', thumbnail_url='https://media.bazaart.me/at/8d1778d5-ded0-4573-8a16-a404770720cb.jpg', seconds=270, song_url='asldkfjasldf.mp3', release_year=2014)
    db.session.add(song5)

    song6 = Song(user_id=4, album_id=3, song_name='Shape of My Heart', thumbnail_url='https://media.bazaart.me/at/8d1778d5-ded0-4573-8a16-a404770720cb.jpg', seconds=245, song_url='alsdfjalskdf.mp3', release_year=1993)
    db.session.add(song6)

    song7 = Song(user_id=3, album_id=1, song_name='Billie Jean', thumbnail_url='https://marketplace.canva.com/EAFOuq-KTcI/1/0/1600w/canva-dark-aesthetic-minimalist-lofi-music-youtube-thumbnail-UIfznurLbPw.jpg', seconds=294, song_url='alksjdfalkjdf.mp3', release_year=1982)
    db.session.add(song7)

    song8 = Song(user_id=4, album_id=4, song_name='Despacito', thumbnail_url='https://media.bazaart.me/at/8d1778d5-ded0-4573-8a16-a404770720cb.jpg', seconds=228, song_url='alksjdflakjsdf.mp3', release_year=2017)
    db.session.add(song8)

    song9 = Song(user_id=1, album_id=5, song_name='Can\'t Stop the Feeling!', thumbnail_url='https://marketplace.canva.com/EAFOuq-KTcI/1/0/1600w/canva-dark-aesthetic-minimalist-lofi-music-youtube-thumbnail-UIfznurLbPw.jpg', seconds=236, song_url='alksdjflkajsdf.mp3', release_year=2016)
    db.session.add(song9)

    song10 = Song(user_id=2, song_name='Shape of You', thumbnail_url='https://marketplace.canva.com/EAFOuq-KTcI/1/0/1600w/canva-dark-aesthetic-minimalist-lofi-music-youtube-thumbnail-UIfznurLbPw.jpg', seconds=230, song_url='alskjdfalksjdf.mp3', release_year=2017)
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
