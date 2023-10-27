import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import {
  getPlaylistByIdThunk,
  getPlaylistSongs,
  removePlaylistSong,
} from "../../store/playlists";
import { getAllSongsThunk } from "../../store/song";

function OnePlaylistPage() {
  const dispatch = useDispatch();
  const { playlistId } = useParams();
  const userId = useSelector((state) => state.session.user.id);
  const playlist = useSelector((state) => state.playlists.currentPlaylist);
  const allSongs = useSelector((state) => state.song.songs);
  const playlistSongs = useSelector((state) => state.playlists.playlistSongs);
  const truePlaylistSongs = allSongs?.filter((song) =>
    playlistSongs.some((ps) => ps.song_id === song.id)
  );
  const handleDelete = (playlistSongId) => {
    dispatch(removePlaylistSong(playlistSongId));
  };

  useEffect(() => {
    dispatch(getPlaylistByIdThunk(playlistId), dispatch(getAllSongsThunk()));
    dispatch(getPlaylistSongs(playlistId));
  }, [dispatch, playlistId]);

  return (
    <div className="playlist-page">
      <div className="one-playlist-container">
        <div id="playlist-top-section">
          <h1> {playlist?.name} Playlist</h1>
        </div>
        <div className="songs-list">
          {truePlaylistSongs.map((song) => (
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
              <button onClick={() => handleDelete(song.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OnePlaylistPage;
