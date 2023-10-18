from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length, URL
from app.models import Album

class AlbumEditForm(FlaskForm):
    album_name = StringField('album_name', validators=[DataRequired(), Length(min=3, max=50)])
    thumbnail_url = StringField('thumbnail_url', validators=[DataRequired(), URL(require_tld=False)])
    release_year = IntegerField('release_year', validators=[DataRequired()])
