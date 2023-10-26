import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getPlaylistByIdThunk } from "../../store/playlists";

function OnePlaylistPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlaylistByIdThunk());
  }, [dispatch]);

  return (
    <div className="albums-page">
      <h1>ONE PLAYLIST</h1>
    </div>
  );
}

export default OnePlaylistPage;
