from .db import db, environment, SCHEMA, add_prefix_for_prod

class PlaylistSong(db.Model):
  __tablename__ = 'playlist_songs'

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  playlist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("playlists.id")), nullable=False)
  song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")), nullable=False)

  playlists = db.relationship('Playlist', back_populates='playlist_song')
  songs = db.relationship('Song', back_populates='playlist_song')
