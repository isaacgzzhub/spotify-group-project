from app.models import db, Playlist, environment, SCHEMA
from sqlalchemy.sql import text


def seed_playlists():
    playlist1 = Playlist(user_id=1, name='Favorites', public=True)
    db.session.add(playlist1)
    playlist2 = Playlist(user_id=2, name='Workout Mix', public=True)
    db.session.add(playlist2)
    playlist3 = Playlist(user_id=1, name='Chill Vibes', public=True)
    db.session.add(playlist3)
    playlist4 = Playlist(user_id=3, name='Road Trip Jams', public=True)
    db.session.add(playlist4)
    playlist5 = Playlist(user_id=2, name='Study Playlist', public=True)
    db.session.add(playlist5)
    playlist6 = Playlist(user_id=4, name='Party Anthems', public=True)
    db.session.add(playlist6)
    playlist7 = Playlist(user_id=3, name='Relaxation Station', public=True)
    db.session.add(playlist7)
    playlist8 = Playlist(user_id=4, name='Late Night Vibes', public=True)
    db.session.add(playlist8)
    playlist9 = Playlist(user_id=1, name='Throwback Hits', public=True)
    db.session.add(playlist9)
    playlist10 = Playlist(user_id=2, name='Best of 2020', public=True)
    db.session.add(playlist10)

    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the songs table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_playlist():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlists"))

    db.session.commit()
