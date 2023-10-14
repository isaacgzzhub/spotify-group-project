from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Song

song_routes = Blueprint('songs', __name__)

# Get all songs
@song_routes.route('/')
@login_required
def get_songs():
    """
    Query for all songs and returns them in a list of song dictionaries
    """
    songs = Song.query.all()
    # print(songs)
    # return songs
    return {'songs': [song.to_dict() for song in songs]}

# Create a song
@song_routes.route('/', methods=['POST'])
@login_required
def create_song():
    """
    Create a new song and returns it
    """
