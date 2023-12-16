from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Song, db, UserLike
from app.forms.song_form import SongForm
from app.forms.song_edit_form import SongEditForm
from .auth_routes import validation_errors_to_error_messages
from app.api.aws import (
    upload_file_to_s3, get_unique_filename)

song_routes = Blueprint('songs', __name__)

# Get all songs
@song_routes.route('/')
@login_required
def get_songs():
    """
    Query for all songs and returns them in a list of song dictionaries
    """
    songs = Song.query.all()

    return jsonify([song.to_dict() for song in songs])

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
        #AWS Steps
        image = form.data["thumbnail_url"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        # song = form.data["song_url"]
        # song.filename = get_unique_filename(song.filename)
        # uploadSong = upload_file_to_s3(song)

        # print("*****UPLOAD*****", upload)
        # print("*****IMAGE*****", image)
        # print("*****UPLOAD SONG*****", uploadSong)
        # print("*****SONG*****", song)
  # Issue is with upload and uploadSong above???
        if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message (and we printed it above)
            return {"errors": upload.get("errors")}
        # songUrl = uploadSong["url"]
        url = upload["url"]

        new_song = Song(
            user_id = form.data['user_id'],
            album_id=form.data['album_id'],
            thumbnail_url=url,
            # song_url=songUrl,
            song_name=form.data['song_name'],
            release_year=form.data['release_year']
          # seconds=form.data['seconds'], # omit seconds for now
        )
        db.session.add(new_song)
        db.session.commit()
        return new_song.to_dict()
        # song = Song(
        #     user_id=form.data['user_id'],
        #     album_id=form.data['album_id'],
        #     song_name=form.data['song_name'],
        #     thumbnail_url=form.data['thumbnail_url'],
        #     seconds=form.data['seconds'],
        #     song_url=form.data['song_url'],
        #     release_year=form.data['release_year']
        # )
        # db.session.add(song)
        # db.session.commit()
        # return song.to_dict()
    # return {'errors': validation_errors_to_error_messages(form.errors)}, 400
    else:
        return {'errors': form.errors}, 400


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
    # return {'errors': validation_errors_to_error_messages(form.errors)}, 400
    return {'errors': form.errors}, 400

# Delete a song
@song_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_song(id):
    song = Song.query.get(id)

    if song is None:
        return {"error": "Song does not exist"}, 404

    db.session.delete(song)

    db.session.commit()
    return song.to_dict()

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

#Get all liked songs
@song_routes.route('/likes/<int:user_id>')
@login_required
def get_likes(user_id):
    """
    Query for all liked songs and returns them in a list
    """
    # Join UserLike with Song on song_id and filter by user_id
    result = db.session.query(UserLike, Song).join(Song, UserLike.song_id == Song.id).filter(UserLike.user_id == user_id).all()

    # result is a list of tuple with the songdata being index 1
    print(result)

    # extract a list of song objects from result
    songs = [song[1] for song in result]
    print(songs)

    return jsonify([song.to_dict() for song in songs])

#Get all likes on a single song
@song_routes.route('/likes/count')
@login_required
def get_likes_count():
    """
    Query for all entries in UserLikes table that has equals passed in song_id
    """
    # Join UserLike with Song on song_id and filter by user_id
    result = UserLike.query.all()

    # # result is a list of tuple with the songdata being index 1
    print(result)

    # songs = [song[1] for song in result]
    # print(songs)

    return jsonify([song.to_dict() for song in result])

#Like a song
@song_routes.route('/<int:song_id>/like/<int:user_id>', methods=['POST'])
@login_required
def add_like(song_id, user_id):
    # check if song is already liked
    liked_song = UserLike.query.filter_by(song_id=song_id, user_id=user_id).first()
    if liked_song is not None:
        return {"error": "Song already liked"}, 400
    else:
        like = UserLike(user_id=user_id, song_id=song_id)
        db.session.add(like)
        db.session.commit()
        return like.to_dict()

#Unlike a song
@song_routes.route('/<int:song_id>/like/<int:user_id>', methods=['DELETE'])
@login_required
def remove_like(song_id, user_id):
    print('hello')
    # queries and selects one *first()* record from UserLike table where song_id = song_id and user_id = user_id
    liked_song = UserLike.query.filter_by(song_id=song_id, user_id=user_id).first()
    print(liked_song)

    if liked_song is None:
        return {"error": "Liked song does not exist"}, 404

    db.session.delete(liked_song)

    db.session.commit()
    return jsonify("Unliked song!")
