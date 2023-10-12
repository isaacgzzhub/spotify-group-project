from .db import db

class PlaylistSong(db.Model):
  __tablename__ = 'playlist_songs'

  id = db.Column(db.Integer, primary_key=True)
  playlist_id = db.Column(db.Integer, db.ForeignKey("playlists.id"), nullable=False)
  song_id = db.Column(db.Integer, db.ForeignKey("songs.id"), nullable=False)

  playlists = db.relationship('Playlist', back_populates='playlist_songs')
  songs = db.relationship('Song', back_populates='playlist_songs')
