from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length, URL
from app.models import Song
from app.api.aws import ALLOWED_EXTENSIONS

class SongForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    album_id = IntegerField('album_id')
    song_name = StringField('song_name', validators=[DataRequired(), Length(min=3, max=50)])
    thumbnail_url = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))]) # string representing url, REPLACED our thumbnail_url column with this instead
    seconds = IntegerField('seconds')
    song_url = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))]) # string representing url, REPLACED our song_url column with this instead
    release_year = IntegerField('release_year', validators=[DataRequired(message="This field is required and must be an integer")])
