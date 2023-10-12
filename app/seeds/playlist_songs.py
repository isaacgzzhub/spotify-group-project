from app.models import db, PlaylistSong, environment, SCHEMA
from sqlalchemy.sql import text


def seed_playlist_songs():
    playlist_song1 = PlaylistSong(playlist_id=1, song_id=1)
    db.session.add(playlist_song1)

    playlist_song2 = PlaylistSong(playlist_id=2, song_id=2)
    db.session.add(playlist_song2)

    playlist_song3 = PlaylistSong(playlist_id=1, song_id=3)
    db.session.add(playlist_song3)

    playlist_song4 = PlaylistSong(playlist_id=3, song_id=4)
    db.session.add(playlist_song4)

    playlist_song5 = PlaylistSong(playlist_id=2, song_id=5)
    db.session.add(playlist_song5)

    playlist_song6 = PlaylistSong(playlist_id=4, song_id=6)
    db.session.add(playlist_song6)

    playlist_song7 = PlaylistSong(playlist_id=3, song_id=7)
    db.session.add(playlist_song7)

    playlist_song8 = PlaylistSong(playlist_id=4, song_id=8)
    db.session.add(playlist_song8)

    playlist_song9 = PlaylistSong(playlist_id=1, song_id=9)
    db.session.add(playlist_song9)

    playlist_song10 = PlaylistSong(playlist_id=2, song_id=10)
    db.session.add(playlist_song10)

    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the playlist_songs table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_playlist_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlist_songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlist_songs"))

    db.session.commit()
