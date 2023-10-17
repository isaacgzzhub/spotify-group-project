from flask import Blueprint, jsonify, request, redirect, url_for
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

#Get one album
@album_routes.route('/<album_id>')
@login_required
def get_album(album_id):  # Note the argument to accept album_id
    """
    Query for an album by id and returns it in a list of the album songs
    """
    album = Album.query.get(album_id)
    if album:
        return jsonify({'album': [album.to_dict()]})
    else:
        return jsonify({"error": "Album not found"}), 404

#Create an album
@album_routes.route('/create-album', methods=['POST'])
@login_required
def create_album():
    """
    Create a new album and returns it
    """
    # data = request.get_json()
    form = AlbumForm()  # Assuming AlbumForm can validate JSON data
    print(form)
    if form.validate_on_submit():
        new_album = Album(
            user_id=form.data['user_id'],
            album_name=form.data['album_name'],
            thumbnail_url=form.data['thumbnail_url'],
            release_year=form.data['release_year']
        )
        db.session.add(new_album)
        db.session.commit()

        # Redirect to the newly created album's page
        return redirect(url_for('get_album', album_id=new_album.id))
    else:
        return jsonify({"error": "Invalid album data provided"}), 400  # Bad Request status
