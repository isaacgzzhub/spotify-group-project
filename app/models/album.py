from .db import db, environment, SCHEMA, add_prefix_for_prod

class Album(db.Model):
  __tablename__ = 'albums'

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
  album_name = db.Column(db.String(50), nullable=False)
  thumbnail = db.Column(db.String, nullable=False)
  release_year = db.Column(db.Integer, nullable=False)

  songs = db.relationship('Song', back_populates='album')
  user = db.relationship('User', back_populates='albums')

  def __to_dict__(self):
      album_dict = {
          'id': self.id,
          'user_id': self.user_id,
          'album_name': self.album_name,
          'thumbnail': self.thumbnail,
          'release_year': self.release_year,
      }
      return album_dict

#album model
