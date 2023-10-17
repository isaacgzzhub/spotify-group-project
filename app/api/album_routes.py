from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Album, db
from app.forms.album_form import AlbumForm

album_routes = Blueprint('albums', __name__)

#Get all albums
@album_routes.route('/')
@login_required
def get_albums():
    """
    Query for all albums and returns them in a list of album dictionaries
    """
    albums = Album.query.all()
    return {'albums': [album.to_dict() for album in albums]}

#Get one song

#Create an album
@album_routes.route('/', methods=['POST'])
@login_required
def create_album():
    """
    Create a new album and returns it
    """
    form = AlbumForm()
    if form.validate_on_submit():
        new_album = Album(
            user_id=form.data['user_id'],
            album_name=form.data['album_name'],
            thumbnail_url=form.data['thumbnail_url'],
            release_year=form.data['release_year']
        )
        db.session.add(new_album)
        db.session.commit()
        return new_album.to_dict()
    return {'error'}
