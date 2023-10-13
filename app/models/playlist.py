from .db import db, add_prefix_for_prod

class Playlist(db.Model):
  __tablename__ = 'playlists'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
  name = db.Column(db.String(50), nullable=False)
  public = db.Column(db.Boolean, nullable=False)

  user = db.relationship('User', back_populates='playlists')
  playlist_song = db.relationship('PlaylistSong', back_populates='playlists')
