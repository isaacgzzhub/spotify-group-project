from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length, URL
from app.models import Song

class SongEditForm(FlaskForm):
    album_id = IntegerField('album_id')
    song_name = StringField('song_name', validators=[DataRequired()])

    def validate_song_name(form, field):
      if type(field.data) is not str:
        print('hello')
        raise ValidationError('Song name must be a string and cannot be empty')
    # URL validator needs 'https://' or 'http://'
    thumbnail_url = StringField('thumbnail_url', validators=[DataRequired(), URL(require_tld=False)])
