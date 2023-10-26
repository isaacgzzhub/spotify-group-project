import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getPlaylistByIdThunk, getPlaylistSongs } from "../../store/playlists";

function OnePlaylistPage() {
  const dispatch = useDispatch();
  const { playlistId } = useParams();
  const userId = useSelector((state) => state.session.user.id);
  const playlist = useSelector((state) => state.playlists.currentPlaylist);
  const songs = useSelector((state) => state.playlists.playlistSongs);

  console.log(songs);

  useEffect(() => {
    dispatch(getPlaylistByIdThunk(playlistId));
    dispatch(getPlaylistSongs(playlistId));
  }, [dispatch, playlistId]);

  return (
    <div className="playlist-page">
      <h1>ONE PLAYLIST</h1>

      <div className="one-playlist-container">
        <div id="playlist-top-section">
          <h1> {playlist?.name} Playlist</h1>
        </div>
        <div className="songs-list">
          {songs.map((song) => (
            <div>
              <NavLink
                key={song.id}
                className="album-tile"
                to={`/songs/${song.id}`}
              >
                <img
                  className="album-img"
                  src={`${song?.thumbnail_url}`}
                  alt="album-cover"
                  title={`${song?.song_name}`}
                />
                <a>{`${song?.song_name}`}</a>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OnePlaylistPage;
