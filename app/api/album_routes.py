from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required
from app.models import Album, db
from app.forms.album_form import AlbumForm
from app.forms.album_edit_form import AlbumEditForm
from .auth_routes import validation_errors_to_error_messages
from app.api.aws import (
    upload_file_to_s3, get_unique_filename)

album_routes = Blueprint('albums', __name__)

#Get all albums
@album_routes.route('/')
@login_required
def get_albums():
    """
    Query for all albums and returns them in a list of album dictionaries
    """
    albums = Album.query.all()
    return jsonify([album.to_dict() for album in albums])

#Get one album
@album_routes.route('/<album_id>')
@login_required
def get_album(album_id):  # Note the argument to accept album_id
    """
    Query for an album by id and returns it in a list of the album songs
    """
    album = Album.query.get(album_id)
    if album:
        return album.to_dict()
    else:
        return {"error": "Album not found"}, 404

# Get albums of logged-in user
@album_routes.route('/user/<user_id>')
@login_required
def get_user_albums(user_id):  # Note the argument to accept album_id
    """
    Query for albums by user_id and returns them in a list of the album songs
    """
    albums = Album.query.filter_by(user_id=user_id).all()
    if albums:
        return jsonify([album.to_dict() for album in albums])
    else:
        return {"error": "Albums not found"}, 404

#Create an album
@album_routes.route('/create-album', methods=['POST'])
@login_required
def create_album():
    """
    Create a new album and returns it
    """
    # data = request.get_json()
    form = AlbumForm()  # Assuming AlbumForm can validate JSON data
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        # ***** Added this block below for AWS ***** #
        image = form.data["thumbnail_url"] # make sure this matches our album_form.py's thumbnail_url column
        image.filename = get_unique_filename(image.filename) # use helper function to generate teh unique filename using the uuid
        # upload contains our errors for debugging incase upload to AWS fails
        upload = upload_file_to_s3(image) # image is an actual file we are sending to AWS, the file will have all sorts of metadata AWS needs to store, most important is the actual file data (ex. image / mp3)
        print(upload) # print out the error

        if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when you tried to upload
        # so you send back that error message (and you printed it above)
            return {"errors": upload.errors}

        url = upload["url"]
        # ***** Added this block above for AWS ***** #

        new_album = Album(
            user_id=form.data['user_id'],
            album_name=form.data['album_name'],
            # changed this line below from:
            # thumbnail_url=form.data['thumbnail_url'],
            thumbnail_url=url, # set the name of our image url column in our database to url found in the line url = upload["url"]
            release_year=form.data['release_year']
        )
        db.session.add(new_album)
        db.session.commit()
        return new_album.to_dict()
    else:
        # return {'errors': validation_errors_to_error_messages(form.errors)}, 400  # Bad Request status
        return {'errors': form.errors}, 400


#Edit an Album
@album_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_album(id):
    form = AlbumEditForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        album = Album.query.get(id)
        album.album_name = form.data['album_name']
        album.thumbnail_url = form.data['thumbnail_url']
        album.release_year = form.data['release_year']

        db.session.commit()
        return album.to_dict()
    # return {'errors': validation_errors_to_error_messages(form.errors)}, 400
    return {'errors': form.errors}, 400


#Delete an Album
@album_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_album(id):
    album = Album.query.get(id)

    if not album:
        return {'error': 'Album does not exist'}, 404

    db.session.delete(album)
    db.session.commit()
    return "Album deleted successfully!"
