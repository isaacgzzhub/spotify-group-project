from .db import db

class Song(db.Model):
  __tablename__ = 'songs'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, nullable=False)
  album_id = db.Column(db.Integer, db.ForeignKey("albums.id"), nullable=False)
  song_name = db.Column(db.String(50), nullable=False)
  seconds = db.Column(db.Integer, nullable=False)
  song_content = db.Column(db.String, unique=True, nullable=False)
  release_year = db.Column(db.Integer, nullable=False)

  album = db.relationship('Album', back_populates='albums')
