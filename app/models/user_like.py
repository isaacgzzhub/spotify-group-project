from .db import db

class UserLike(db.Model):
  __tablename__ = 'user_likes'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  song_id = db.Column(db.Integer, db.ForeignKey("songs.id"), nullable=False)

  songs = db.relationship('Song', back_populates='user_like')
  users = db.relationship('User', back_populates='user_like')
