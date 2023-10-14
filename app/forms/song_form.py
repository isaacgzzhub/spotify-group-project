from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Song

class SongForm(FlaskForm):
# album id??? field
    song_name = StringField('song_name', validators=[DataRequired()])
    seconds = IntegerField('seconds', validators=[DataRequired()])
    song_content = StringField('song_content', validators=[DataRequired()])
    release_year = IntegerField('release_year', validators=[DataRequired()])
