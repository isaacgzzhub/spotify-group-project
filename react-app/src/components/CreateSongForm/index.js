import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSongThunk } from "../../store/song";
import { getUserAlbumsThunk } from "../../store/albums";

function CreateSongForm() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);
  const createdSong = useSelector((state) => state.song.createdSong);
  const userAlbums = useSelector((state) => state.albums.userAlbums);
  console.log('hello:',userAlbums)

  const [songName, setSongName] = useState("")
  const [songThumbnail, setSongThumbnail] = useState("")
  const [songUrl, setSongUrl] = useState("")
  const [releaseYear, setReleaseYear] = useState("")
  const [albumId, setAlbumId] = useState("")
  // const history = useHistory();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getUserAlbumsThunk(userId))
  }, [dispatch]);
  //   }, [dispatch, albumName, thumbnailUrl, releaseYear]);

    // const errors = {};
    // if (albumName.length > 50)
    //   errors.albumName = "Album name must be less than 50 characters";
    // if (!albumName) errors.albumName = "Album name is required";
    // if (!thumbnailUrl) errors.thumbnailUrl = "Cover for album required";
    // if (!releaseYear) errors.releaseYear = "Release Year for album required";
    // setErrors(errors);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('hihihiihi',albumId)
    setErrors({});
    const payload = {
      user_id: userId,
      album_id: parseInt(albumId),
      song_name: songName,
      thumbnail_url: songThumbnail,
      song_url: songUrl,
      release_year: releaseYear,
    };

    await dispatch(createSongThunk(payload));
    // history.push(`/song/s);

  };
  return (
    <div>
      <form className="album-form" onSubmit={handleSubmit}>
        <h1>Create A New Song</h1>

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
          <select
          onChange={(e) => setAlbumId(e.target.value)}
          value={albumId}>
          <option value="" disabled selected hidden>Choose an album</option>
          {userAlbums?.map(album => {
            return (
              <option value={album.id}>{album.album_name}</option>
            )
          })}
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
