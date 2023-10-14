from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Song

class SongForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    album_id = IntegerField('album_id')
    song_name = StringField('song_name', validators=[DataRequired()])
    thumbnail_url = StringField('thumbnail_url', validators=[DataRequired()])
    seconds = IntegerField('seconds', validators=[DataRequired()])
    song_url = StringField('song_url', validators=[DataRequired()])
    release_year = IntegerField('release_year', validators=[DataRequired()])