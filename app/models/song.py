from .db import db, add_prefix_for_prod

class Song(db.Model):
  __tablename__ = 'songs'


  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
  album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("albums.id")), nullable=False)
  song_name = db.Column(db.String(50), nullable=False)
  seconds = db.Column(db.Integer, nullable=False)
  song_content = db.Column(db.String, unique=True, nullable=False)
  release_year = db.Column(db.Integer, nullable=False)

  album = db.relationship('Album', back_populates='songs')
  user = db.relationship('User', back_populates='songs')
  playlist_song = db.relationship('PlaylistSong', back_populates='songs')
  user_like = db.relationship('UserLike', back_populates='songs')
