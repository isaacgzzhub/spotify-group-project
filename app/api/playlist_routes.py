from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Song, db, UserLike
from app.forms.song_form import SongForm
from app.forms.song_edit_form import SongEditForm
from .auth_routes import validation_errors_to_error_messages

playlist_routes = Blueprint('playlists', __name__)


@playlist_routes.route('/')
@login_required
def get_songs():
    pass
