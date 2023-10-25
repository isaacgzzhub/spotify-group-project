import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPlaylistsThunk } from "../../store/playlists";

function MyPlaylistsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyPlaylistsThunk());
  }, [dispatch]);


  return (
    <div className="albums-page">
      <h1>MY PLAYLISTS</h1>

    </div>
  );
}

export default MyPlaylistsPage;
