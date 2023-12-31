import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllPlaylistsThunk } from "../../store/playlists";

function PlaylistsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPlaylistsThunk());
  }, [dispatch]);

  const playlistObj = useSelector((state) => state.playlists.allPlaylists);
  const playlists = Object.values(playlistObj);

  return (
    <div className="playlist-page">
      <h1>ALL PLAYLISTS</h1>
      <div className="playlist-wrapper">
        {playlists.map((playlist) => (
          <NavLink
            key={playlist.id}
            className="playlist-tile"
            to={`/playlists/${playlist.id}`}
          >
            <div>
              <h2>{`${playlist.name}`}</h2>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default PlaylistsPage;
