from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, URL
from app.models import Album

class AlbumForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    album_name = StringField('album_name', validators=[DataRequired(), Length(min=3, max=50)])
    thumbnail_url = StringField('thumbnail_url', validators=[DataRequired(), URL(require_tld=False)])
    release_year = IntegerField('release_year', validators=[DataRequired(message="This field is required and must be an integer")])
