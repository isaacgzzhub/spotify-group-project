from .db import db, environment, SCHEMA, add_prefix_for_prod

class Song(db.Model):
  __tablename__ = 'songs'

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
  album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("albums.id")), nullable=True)
  song_name = db.Column(db.String(50), nullable=False)
  artist = db.Column(db.String(50), nullable=False)
  thumbnail_url = db.Column(db.String, nullable=True)
  seconds = db.Column(db.Integer, nullable=True)
  song_url = db.Column(db.String, nullable=True) # switch to nullable is true for now
  release_year = db.Column(db.Integer, nullable=False)

  album = db.relationship('Album', back_populates='songs')
  user = db.relationship('User', back_populates='songs')
  playlist_song = db.relationship('PlaylistSong', back_populates='songs', cascade="all, delete-orphan")
  user_like = db.relationship('UserLike', back_populates='songs', cascade="all, delete-orphan")

  def to_dict(self):
      return {
          'id': self.id,
          'user_id': self.user_id,
          'album_id': self.album_id,
          'song_name': self.song_name,
          'artist': self.artist,
          'thumbnail_url': self.thumbnail_url,
          'seconds': self.seconds,
          'song_url': self.song_url,
          'release_year': self.release_year,
      }
