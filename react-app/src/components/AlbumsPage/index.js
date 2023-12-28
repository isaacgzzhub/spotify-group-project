import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllAlbumsThunk } from "../../store/albums";
import "./Albums.css";

function AlbumsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAlbumsThunk());
  }, [dispatch]);

  const albumsObj = useSelector((state) => state.albums);
  const albums = Object.values(albumsObj);

  return (
    <div className="albums-page">
      <h1>All Albums</h1>
      <div className="album-wrapper">
        {albums.map((album) => (
          <div>
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
          </NavLink>
            <p>{`${album.album_name}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlbumsPage;
