from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Song, db
from app.forms.song_form import SongForm
from app.forms.song_edit_form import SongEditForm
from .auth_routes import validation_errors_to_error_messages

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
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# Edit a song
# Come back for constraints/validators?
@song_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_song(id):
    form = SongEditForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        song = Song.query.get(id)
        song.album_id = form.data['album_id']
        song.song_name = form.data['song_name']
        song.thumbnail_url = form.data['thumbnail_url']

        db.session.commit()
        return song.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# Delete a song
@song_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_song(id):
    song = Song.query.get(id)

    if song is None:
        return {"error": "Song does not exist"}, 404

    db.session.delete(song)

    db.session.commit()
    return "Song deleted successfully!"

#Get one song
@song_routes.route('/<id>')
@login_required
def get_song(id):
    """
    Query for an song by id and returns it in a list of the album songs
    """
    song = Song.query.get(id)
    if song:
        return song.to_dict()
    else:
        return {"error": "Song not found"}, 404
