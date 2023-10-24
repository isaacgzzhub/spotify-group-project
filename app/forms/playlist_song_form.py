from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class PlaylistSongForm(FlaskForm):
  playlist_id = IntegerField('playlist_id', validators=[DataRequired()])
  song_id = IntegerField('song_id', validators=[DataRequired()])
