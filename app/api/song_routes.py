from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Song, db
from app.forms.song_form import SongForm

song_routes = Blueprint('songs', __name__)

# Get all songs
@song_routes.route('/')
@login_required
def get_songs():
    """
    Query for all songs and returns them in a list of song dictionaries
    """
    songs = Song.query.all()

    return {'songs': [song.to_dict() for song in songs]}

# Create a song
@song_routes.route('/', methods=['POST'])
@login_required
def create_song():
    """
    Create a new song and returns it
    """
    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        song = Song(
            user_id=form.data['user_id'],
            album_id=form.data['album_id'],
            song_name=form.data['song_name'],
            thumbnail_url=form.data['thumbnail_url'],
            seconds=form.data['seconds'],
            song_url=form.data['song_url'],
            release_year=form.data['release_year']
        )
        db.session.add(song)
        db.session.commit()
        return song.to_dict()
    return {'error'}
