import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { createSongThunk } from "../../store/song";
import { getAllAlbumsThunk } from "../../store/albums";


function AddAlbumSong() {
    const dispatch = useDispatch();
    const { albumId } = useParams();
    const history = useHistory();
    const userId = useSelector((state) => state.session.user.id)
    const album = useSelector((state) => state.albums[albumId])

    const [songName, setSongName] = useState("");
    const [songThumbnail, setSongThumbnail] = useState("");
    const [songUrl, setSongUrl] = useState("");
    const [releaseYear, setReleaseYear] = useState("");
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(getAllAlbumsThunk());
      }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors([]);
        const payload = {
          user_id: userId,
          album_id: albumId,
          song_name: songName,
          thumbnail_url: songThumbnail,
          song_url: songUrl,
          release_year: releaseYear,
        };
        const res = await dispatch(createSongThunk(payload));

        if (res && res.errors) {
          setErrors(res.errors);
        } else {
          history.push(`/albums/${albumId}`);
        }
      };


    return (
        <div>
        <form className="form" onSubmit={handleSubmit}>
        <h1>Add a New Song to the {`${album?.album_name}`} Album</h1>

        {errors && errors.length > 0 && (
        <div className="error-messages">
            {errors.map((error, index) => (
            <p key={index}>{error}</p>
            ))}
        </div>
)}

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
        <p className="errors"> </p>

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
            placeholder="Song Thumbnail Image"
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

        <button
          type="submit"
          disabled={!songName || !releaseYear || !songThumbnail || !songUrl}
        >
          Create Song
        </button>
      </form>
        </div>
    )
}

export default AddAlbumSong;
