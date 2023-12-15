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
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  // const [songThumbnail, setSongThumbnail] = useState("");
  const [songFile, setSongFile] = useState(null);
  const [releaseYear, setReleaseYear] = useState("");
  const [albumId, setAlbumId] = useState("");
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

  useEffect(() => {
    dispatch(getUserAlbumsThunk(userId));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setGeneralError("");

    const formData = new FormData();

    // console.log("user_id", userId);
    // console.log("album_id", albumId);
    // console.log("thumbnail_url", image);
    // console.log("song_name", songName);
    // console.log("song_url", songFile);
    // console.log("release_year", releaseYear);

    formData.append("user_id", userId);
    formData.append("album_id", albumId ? parseInt(albumId) : undefined);
    formData.append("thumbnail_url", image);
    formData.append("song_name", songName);
    formData.append("song_url", songFile);
    formData.append("release_year", releaseYear);
    // console.log("*********FORM DATA************", formData);

    setImageLoading(true);
    // console.log("Form Data Content:", Array.from(formData.entries()));

    await dispatch(createSongThunk(formData));

    // try {
    //   const response = await dispatch(createSongThunk(formData));
    //   console.log(response);
    //   if (response && response.errors) {
    //     setErrors(response.errors);
    //   } else {
    //     history.push(`/mysongs`);
    //   }
    // } catch (error) {
    //   setGeneralError("An error occurred. Please try again later.");
    // } finally {
    //   setImageLoading(false);
    // }
    // const payload = {
    //   user_id: userId,
    //   album_id: albumId ? parseInt(albumId) : undefined,
    //   song_name: songName,
    //   thumbnail_url: songThumbnail,
    //   song_url: songUrl,
    //   release_year: releaseYear,
    // };
    // const res = await dispatch(createSongThunk(payload));

    // if (res && res.errors) {
    //   setErrors(res.errors);
    // } else {
    //   history.push("/mysongs");
    // }
  };

  return (
    <div>
      <form
        className="form"
        onSubmit={handleSubmit}
        encType="multipart/form-data" // added this here, it was missing, this is so we don't put headers in the thunk, the browser handles it instead
      >
        <h1>Create A New Song</h1>

        {generalError && (
          <p className="errors" style={{ color: "red", fontSize: 11 }}>
            {generalError}
          </p>
        )}

        <label>
          <div className="form-row">
            Song Name
            <p style={{ color: "red", fontSize: 11 }}>{errors.song_name}</p>
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
            Song Audio File
            <p style={{ color: "red", fontSize: 11 }}>{errors.song_url}</p>
          </div>
          <input
            type="file"
            accept="audio/mp3"
            onChange={(e) => setSongFile(e.target.files[0])} // removed the ?. from files?.
          />
        </label>

        <label>
          <div className="form-row">
            Song Thumbnail Image
            <p style={{ color: "red", fontSize: 11 }}>{errors.thumbnail_url}</p>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])} // removed the ?. from files?.
          />
        </label>

        <label>
          <div className="form-row">
            Song's Release Year
            <p style={{ color: "red", fontSize: 11 }}>{errors.release_year}</p>
          </div>
          <input
            type="text"
            placeholder="Song's Release Year"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
          />
        </label>

        <label>
          <div className="form-row" style={{ marginBottom: 500 }}>
            Add Song to an Album
            <p style={{ color: "red", fontSize: 11 }}>{}</p>
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
          disabled={!songName || !releaseYear || !image || !songFile} // RE-ENABLE LATER
        >
          Create Song
        </button>
        {imageLoading && <p>Loading...</p>}
      </form>
    </div>
  );
}

export default CreateSongForm;
