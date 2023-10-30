import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editSongThunk, getSongByIdThunk } from "../../store/song";
import { getUserAlbumsThunk } from "../../store/albums";

function EditSongForm() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);
  const song = useSelector((state) => state.song?.song);
  const userAlbums = useSelector((state) => state.albums.userAlbums)
  const history = useHistory();
  const { songId } = useParams()
  const [songName, setSongName] = useState("");
  const [songThumbnail, setSongThumbnail] = useState("");
  const [albumId, setAlbumId] = useState("");
  const [errors, setErrors] = useState({});


  useEffect(() => {
    dispatch(getSongByIdThunk(songId));
    dispatch(getUserAlbumsThunk(userId))
    const errors = {};
    setErrors(errors);
  }, [dispatch]);

  useEffect(() => {
    if (song) {
    setSongName(song?.song_name)
    setSongThumbnail(song?.thumbnail_url)
    setAlbumId(song?.album_id)
    }
  }, [dispatch, song, songId, userId])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const payload = {
      album_id: albumId ? parseInt(albumId) : undefined,
      song_name: songName,
      thumbnail_url: songThumbnail
    };

    const res = await dispatch(editSongThunk(songId, payload))

    if (res && res.errors) {
      setErrors(res.errors)
    }

    history.push("/mysongs")
  };

  return (
    <div>

     <form className="form" onSubmit={handleSubmit}>

      <h1>Update {song?.song_name}</h1>

      {errors[0] ?? <p>{errors[0]}</p>}
      {errors[1] ?? <p>{errors[1]}</p>}

      <label>
        <div className="form-row">
            Song Name
            <p className="errors">{errors.songName}</p>
        </div>
        {errors.songName ??
          <h1>{errors.songName}</h1>}
        <input
            type="text"
            placeholder="Song Name"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
        />
      </label>

      <label>
        <div className="form-row">
            Song Thumbnail
            <p className="errors">{errors.songThumbnail}</p>
        </div>
        <input
            type="text"
            placeholder="Song Thumbnail"
            value={songThumbnail}
            onChange={(e) => setSongThumbnail(e.target.value)}
        />
      </label>

      <label>
        <div className="form-row">
            Song's Album
            <p className="errors">{errors.albumId}</p>
        </div>
        <select onChange={(e) => setAlbumId(e.target.value)} value={albumId}>
            {userAlbums?.map((album) => {
              return <option value={album.id}>{album.album_name}</option>;
            })}
            <option selected value=''>No album</option>
          </select>
      </label>

      <button type="submit" disabled={!songName || !songThumbnail}>Update Song</button>


     </form>


    </div>
  );
}

export default EditSongForm;
