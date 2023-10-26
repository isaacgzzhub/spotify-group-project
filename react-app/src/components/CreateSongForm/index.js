import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSongThunk } from "../../store/song";
import { getUserAlbumsThunk } from "../../store/albums";

function CreateSongForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector((state) => state.session.user.id);
  const userAlbums = useSelector((state) => state.albums.userAlbums);

  const [songName, setSongName] = useState("");
  const [songThumbnail, setSongThumbnail] = useState("");
  const [songUrl, setSongUrl] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [albumId, setAlbumId] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getUserAlbumsThunk(userId));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors([]);
    const payload = {
      user_id: userId,
      album_id: albumId ? parseInt(albumId) : undefined,
      song_name: songName,
      thumbnail_url: songThumbnail,
      song_url: songUrl,
      release_year: releaseYear,
    };
    const res = await dispatch(createSongThunk(payload));

    if (res && res.errors) {
      setErrors(res["errors"])
    };

    history.push("/mysongs")
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h1>Create A New Song</h1>

        {errors ?? errors.map((error) => {
          return <p>{error}</p>
        })}

        <label>
          <div className="form-row">
            Song Name
            <p className="errors">{errors.songName}</p>
          </div>
          <input
            type="text"
            placeholder="Song Name"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
          />
        </label>

        <label>
          <div className="form-row">
            Song Audio URL
            <p className="errors">{errors.songUrl}</p>
          </div>
          <input
            type="text"
            placeholder="Song Audio URL"
            value={songUrl}
            onChange={(e) => setSongUrl(e.target.value)}
          />
        </label>

        <label>
          <div className="form-row">
            Song Thumbnail Image
            <p className="errors">{errors.songThumbnail}</p>
          </div>
          <input
            type="text"
            placeholder="Cover Photo URL"
            value={songThumbnail}
            onChange={(e) => setSongThumbnail(e.target.value)}
          />
        </label>

        <label>
          <div className="form-row">
            Song's Release Year
            <p className="errors">{errors.releaseYear}</p>
          </div>
          <input
            type="text"
            placeholder="Song's Release Year"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
          />
        </label>

        <label>
          <div className="form-row">
            Add Song to an Album
            <p className="errors">{errors.songThumbnail}</p>
          </div>
          <select onChange={(e) => setAlbumId(e.target.value)} value={albumId}>
            <option value="" disabled selected hidden>
              Choose an album
            </option>
            {userAlbums?.map((album) => {
              return <option value={album.id}>{album.album_name}</option>;
            })}
            <option value="">No album</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={!songName || !releaseYear || !songThumbnail || !songUrl}
        >
          Create Song
        </button>

      </form>
    </div>
  );
}

export default CreateSongForm;
