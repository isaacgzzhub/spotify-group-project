import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllAlbumsThunk } from "../../store/albums";

function AlbumForm() {
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
      <h1> Album Form</h1>

    </div>
  );
}

export default AlbumForm;
