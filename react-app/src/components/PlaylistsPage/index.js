import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllPlaylistsThunk } from "../../store/playlists";

function PlaylistsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPlaylistsThunk());
  }, [dispatch]);

  // const playlistAlbums = useSelector((state) => state.)

  return (
    <div className="albums-page">
      <h1>ALL PLAYLISTS</h1>

    </div>
  );
}

export default PlaylistsPage;
