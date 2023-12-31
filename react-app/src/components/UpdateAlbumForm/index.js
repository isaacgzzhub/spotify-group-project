import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllAlbumsThunk, editAlbum } from "../../store/albums";

function AlbumForm() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);
  const history = useHistory();
  const { albumId } = useParams()
  const albumsObj = useSelector((state) => state.albums);
  const albums = Object.values(albumsObj);
  const album = useSelector((state) => state.albums[Number(albumId)])
  const [albumName, setAlbumName] = useState(album?.album_name);
  const [thumbnailUrl, setThumbnailUrl] = useState(album?.thumbnail_url);
  const [releaseYear, setReleaseYear] = useState(album?.release_year);
  const [errors, setErrors] = useState({});
  const updateAlbumName = (e) => setAlbumName(e.target.value);
  const updateThumbnailUrl = (e) => setThumbnailUrl(e.target.value);
  const updateReleaseYear = (e) => setReleaseYear(e.target.value);

  useEffect(() => {
    dispatch(getAllAlbumsThunk());
    // if (albumName?.length > 50) errors.albumName = "Album name must be less than 50 characters";
    // if (!albumName) errors.albumName = "Album name is required";
    // if (!thumbnailUrl) errors.thumbnailUrl = "Cover for album required";
    // if (!releaseYear) errors.releaseYear = "Release Year for album required";
    // setErrors(errors);
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const payload = {
      id: album.id,
      user_id: userId,
      album_name: albumName,
      thumbnail_url: thumbnailUrl,
      release_year: releaseYear,
    };

    const res = await dispatch(editAlbum(payload))

    if (res && res.errors) {
      setErrors(res.errors);
    } else {
      history.push(`/albums/${album.id}`);
    };

  };
  return (
    <div>

     <form className="form" onSubmit={handleSubmit}>

      <h1>Update {album?.album_name} Album</h1>
{/*
      {errors ?? errors.map((error, index) => {
          return <p>{error}</p>
        })} */}

      <label>
        <div className="form-row">
            Album Name
            <p style={{color:"red", fontSize:11}}>{errors.album_name}</p>
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
            <p style={{color:"red", fontSize:11}}>{errors.release_year}</p>
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
            <p style={{color:"red", fontSize:11}}>{errors.thumbnail_url}</p>
        </div>
        <input
            type="text"
            placeholder="Cover Photo URL"
            value={thumbnailUrl}
            onChange={updateThumbnailUrl}
        />
      </label>

      <button type="submit" disabled={!albumName || !releaseYear || !thumbnailUrl}>Update Album</button>


     </form>


    </div>
  );
}

export default AlbumForm;
