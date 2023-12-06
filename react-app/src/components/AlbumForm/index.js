import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllAlbumsThunk, createAlbum } from "../../store/albums";

function AlbumForm() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);
  const history = useHistory();
  const albumsObj = useSelector((state) => state.albums);
  const albums = Object.values(albumsObj);
  const [albumName, setAlbumName] = useState("");
  // const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [releaseYear, setReleaseYear] = useState("");
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

  const updateAlbumName = (e) => setAlbumName(e.target.value);
  // const updateThumbnailUrl = (e) => setThumbnailUrl(e.target.value);
  const updateReleaseYear = (e) => setReleaseYear(e.target.value);

  useEffect(() => {
    dispatch(getAllAlbumsThunk());
    // const errors = {};
    // if (albumName.length > 50)
    //   errors.albumName = "Album name must be less than 50 characters";
    // if (!albumName) errors.albumName = "Album name is required";
    // if (!thumbnailUrl) errors.thumbnailUrl = "Cover for album required";
    // if (!releaseYear) errors.releaseYear = "Release Year for album required";
    // setErrors(errors);
  }, [dispatch]);
// }, [dispatch, albumName, thumbnailUrl, releaseYear]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setGeneralError("");

    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("album_name", albumName);
    formData.append("thumbnail_url", image);
    formData.append("release_year", releaseYear);
    setImageLoading(true);

    try {
      const response = await dispatch(createAlbum(formData));

      if (response) {
        console.log(response)
      }
      // Check if the response is JSON
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const responseData = await response.json();
        console.log(responseData);

        if (responseData && responseData.errors) {
          setErrors(responseData.errors);
        } else {
          history.push(`/albums/${albums.length + 1}`);
        }
      } else {
        // Log the raw response or handle it accordingly
        console.log(response);
      }
    } catch (error) {
        setGeneralError("An error occurred. Please try again later.");
    } finally {
        setImageLoading(false);
    }


    // const payload = {
    //   user_id: userId,
    //   album_name: albumName,
    //   thumbnail_url: thumbnailUrl,
    //   release_year: releaseYear,
    // };

    // // res will be album if successful else it will be errors (look at thunk in store)
    // const res = await dispatch(createAlbum(payload));

    // if (res && res.errors) {
    //   setErrors(res.errors);
    // } else {
    //   history.push(`/albums/${albums.length + 1}`);
    // };

  };



  return (
    <div>
      <form className="form" encType="multipart/form-data" onSubmit={handleSubmit}>
        <h1>Create A New Album</h1>

        {generalError && (
              <p className="errors" style={{ color: "red", fontSize: 11 }}>
                  {generalError}
              </p>
          )}

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
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0])}
            />
        </label>

        <button
          type="submit"
          disabled={!albumName || !releaseYear || !image}
        >
          Create Album
        </button>
        {(imageLoading)&& <p>Loading...</p>}
      </form>
    </div>
  );
}

export default AlbumForm;
