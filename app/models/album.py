from .db import db

class Album(db.Model):
  __tablename__ = 'albums'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  album_name = db.Column(db.String(50), nullable=False)
  thumbnail = db.Column(db.String, nullable=False)
  release_year = db.Column(db.Integer, nullable=False)

  songs = db.relationship('Song', back_populates='album')
  user = db.relationship('User', back_populates='albums')
