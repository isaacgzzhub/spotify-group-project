import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllAlbumsThunk } from "../../store/albums";

function MyAlbumsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAlbumsThunk());
  }, [dispatch]);

  const userId = useSelector((state) => state.session.user.id);
  const albumsObj = useSelector((state) => state.albums);
  const albums = Object.values(albumsObj);
  const myAlbums = albums.filter((album) => album.user_id === userId);

  return (
    <div id="albums-page">
      <h1>My Albums</h1>
      <div className="album-tile-list">
        {myAlbums.map((album) => (
          <NavLink
            key={album.id}
            className="album-tile"
            to={`/albums/${album.id}`}
          >
            <img
              className="album-img"
              src={`${album.thumbnail_url}`}
              alt="album-cover"
              title={`${album.album_name}`}
            />
            <a>{`${album.album_name}`}</a>
            <button>Update Album</button>
            <button>Delete</button>
          </NavLink>
        ))}
      </div>

      <NavLink to="/">Create Album</NavLink>
    </div>
  );
}

export default MyAlbumsPage;
