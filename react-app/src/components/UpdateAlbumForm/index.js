import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllAlbumsThunk, createAlbum } from "../../store/albums";

function AlbumForm() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);
  const history = useHistory();
  const [albumName, setAlbumName] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [errors, setErrors] = useState({});
  const updateAlbumName = (e) => setAlbumName(e.target.value);
  const updateThumbnailUrl = (e) => setThumbnailUrl(e.target.value);
  const updateReleaseYear = (e) => setReleaseYear(e.target.value);

  useEffect(() => {
    dispatch(getAllAlbumsThunk());
    const errors = {};
    if (albumName.length > 50)
      errors.albumName = "Album name must be less than 50 characters";
    if (!albumName) errors.albumName = "Album name is required";
    if (!thumbnailUrl) errors.thumbnailUrl = "Cover for album required";
    if (!releaseYear) errors.releaseYear = "Release Year for album required";
    setErrors(errors);
  }, [dispatch, albumName, thumbnailUrl, releaseYear]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const payload = {
      user_id: userId,
      album_name: albumName,
      thumbnail_url: thumbnailUrl,
      release_year: releaseYear,
    };

    const createdAlbum = await dispatch(createAlbum(payload));
    history.push(`/albums/${createdAlbum.id}`);
  };
  return (
    <div>

     <form className="album-form" onSubmit={handleSubmit}>

      <h1>Create A New Album</h1>

      <label>
        <div className="form-row">
            Album Name
            <p className="errors">{errors.albumName}</p>
        </div>
        <input
            type="text"
            placeholder="Album Name"
            value={albumName}
            onChange={updateAlbumName}
        />
      </label>

      <label>
        <div className="form-row">
            Release Year
            <p className="errors">{errors.releaseYear}</p>
        </div>
        <input
            type="text"
            placeholder="Release Year"
            value={releaseYear}
            onChange={updateReleaseYear}
        />
      </label>

      <label>
        <div className="form-row">
            Cover Photo
            <p className="errors">{errors.thumbnailUrl}</p>
        </div>
        <input
            type="text"
            placeholder="Cover Photo URL"
            value={thumbnailUrl}
            onChange={updateThumbnailUrl}
        />
      </label>

      <button type="submit" disabled={!albumName || !releaseYear || !thumbnailUrl}>Create Spot</button>


     </form>


    </div>
  );
}

export default AlbumForm;
