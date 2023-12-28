from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text


def seed_songs():
    song1 = Song(user_id=1, album_id=1, song_name='Barbie Girl', artist='Aqua', thumbnail_url='https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/81jAJu+OSjL._UF1000,1000_QL80_.jpg', seconds=180, song_url='kaljsdfljsdlfjdlfa.mp3', release_year=1993)
    db.session.add(song1)

    song2 = Song(user_id=2, album_id=1, song_name='Shape of You', artist='Ed Sheeran', thumbnail_url='https://upload.wikimedia.org/wikipedia/en/b/b4/Shape_Of_You_%28Official_Single_Cover%29_by_Ed_Sheeran.png', seconds=210, song_url='asldfjlkajsdf.mp3', release_year=2017)
    db.session.add(song2)

    song3 = Song(user_id=1, album_id=2, song_name='Bohemian Rhapsody', artist='Queen', thumbnail_url='https://media.pitchfork.com/photos/5bcdf9b8a8f1ec1406cb9892/16:9/w_1280,c_limit/Queen_Bohemian%20Rhapsody%20OST.jpg', seconds=354, song_url='alksdfjalsdf.mp3', release_year=1975)
    db.session.add(song3)

    song4 = Song(user_id=3, album_id=2, song_name='Rolling in the Deep', artist='Adele', thumbnail_url='https://upload.wikimedia.org/wikipedia/en/7/74/Adele_-_Rolling_in_the_Deep.png', seconds=228, song_url='alksdjflajsd.mp3', release_year=2010)
    db.session.add(song4)

    song5 = Song(user_id=2, album_id=3, song_name='Uptown Funk',artist='Mark Ronson ft. Bruno Mars', thumbnail_url='https://f4.bcbits.com/img/a0339371463_5.jpg', seconds=270, song_url='asldkfjasldf.mp3', release_year=2014)
    db.session.add(song5)

    song6 = Song(user_id=4, album_id=3, song_name='Shape of My Heart', artist='Sting', thumbnail_url='https://f4.bcbits.com/img/a0237084939_10.jpg', seconds=245, song_url='alsdfjalskdf.mp3', release_year=1993)
    db.session.add(song6)

    song7 = Song(user_id=3, album_id=1, song_name='Billie Jean', artist='Michael Jackson', thumbnail_url='https://marketplace.canva.com/EAFOuq-KTcI/1/0/1600w/canva-dark-aesthetic-minimalist-lofi-music-youtube-thumbnail-UIfznurLbPw.jpg', seconds=294, song_url='alksjdfalkjdf.mp3', release_year=1982)
    db.session.add(song7)

    song8 = Song(user_id=4, album_id=4, song_name='Despacito', artist='Luis Fonsi ft. Daddy Yankee', thumbnail_url='https://upload.wikimedia.org/wikipedia/en/c/c8/Luis_Fonsi_Feat._Daddy_Yankee_-_Despacito_%28Official_Single_Cover%29.png', seconds=228, song_url='alksjdflakjsdf.mp3', release_year=2017)
    db.session.add(song8)

    song9 = Song(user_id=1, album_id=5, song_name='Can\'t Stop the Feeling!', artist='Justin Timberlake', thumbnail_url='https://upload.wikimedia.org/wikipedia/en/2/21/Justin_Timberlake_-_Can%27t_Stop_the_Feeling.png', seconds=236, song_url='alksdjflkajsdf.mp3', release_year=2016)
    db.session.add(song9)

    song10 = Song(user_id=2, song_name='Greedy', artist='Tate McRae', thumbnail_url='https://i1.sndcdn.com/artworks-OfGdxPzkOTbhCKlH-SGoBFQ-t500x500.jpg', seconds=230, song_url='alskjdfalksjdf.mp3', release_year=2023)
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
