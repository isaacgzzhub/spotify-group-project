from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Playlist, PlaylistSong
from app.forms.playlist_song_form import PlaylistSongForm
from .auth_routes import validation_errors_to_error_messages

playlist_routes = Blueprint('playlists', __name__)

# Get all playlists

@playlist_routes.route('/')
@login_required
def get_playlists():
    playlists = Playlist.query.all()
    return jsonify([playlist.to_dict() for playlist in playlists])

@playlist_routes.route('/<playlist_id>')
@login_required
def get_playlist(playlist_id):
    playlist = Playlist.query.get(playlist_id)
    if playlist:
        return playlist.to_dict()
    else:
        return {"Error": "Playlist not found"}, 404

@playlist_routes.route('/user/<user_id>')
@login_required
def get_user_playlists(user_id):  # Note the argument to accept album_id
    playlists = Playlist.query.filter_by(user_id=user_id).all()
    if playlists:
        return jsonify([playlist.to_dict() for playlist in playlists])
    else:
        return {"error": "Playlists not found"}, 404

@playlist_routes.route('/<playlist_id>/songs')
@login_required
def get_playlist_songs(playlist_id):
    songs = PlaylistSong.query.filter_by(playlist_id=playlist_id).all()
    return jsonify([song.to_dict() for song in songs])


@playlist_routes.route('/<playlist_id>/add-song', methods = ['POST'] )
@login_required
def create_playlist_song():
     form = PlaylistSongForm()
     form['csrf_token'].data = request.cookies['csrf_token']
     if form.validate_on_submit():
        new_playlist_song = PlaylistSong(
             playlist_id=form.data['playlist_id'],
             song_id=form.data['song_id']
             )
        db.session.add(new_playlist_song)
        db.session.commit()
        return new_playlist_song.to_dict()
     else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400  # Bad Request status

#Remove a Song

@playlist_routes.route('/songs/<int:id>', methods=['DELETE'])
@login_required
def remove_song(id):
    song = PlaylistSong.query.get(id)

    if not song:
        return {'error': 'Song is not on playlist'}, 404

    db.session.delete(song)
    db.session.commit()
    return "Song removed successfully!"
