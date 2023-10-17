from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import Album

class AlbumForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    album_name = StringField('album_name', validators=[DataRequired()])
    thumbnail_url = StringField('thumbnail_url', validators=[DataRequired()])
    release_year = IntegerField('release_year', validators=[DataRequired()])
