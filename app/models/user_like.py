from .db import db, environment, SCHEMA, add_prefix_for_prod

class UserLike(db.Model):
  __tablename__ = 'user_likes'

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
  song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")), nullable=False)

  songs = db.relationship('Song', back_populates='user_like')
  users = db.relationship('User', back_populates='user_like')

  def to_dict(self):
      return {
          'id': self.id,
          'user_id': self.user_id,
          'song_id': self.song_id
      }
