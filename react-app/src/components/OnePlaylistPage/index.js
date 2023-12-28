import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import {
  getPlaylistByIdThunk,
  getPlaylistSongs,
  removePlaylistSong,
} from "../../store/playlists";
import { getAllSongsThunk } from "../../store/song";
import { useHistory } from "react-router-dom";

function OnePlaylistPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { playlistId } = useParams();
  const userId = useSelector((state) => state.session.user.id);
  const playlist = useSelector((state) => state.playlists.currentPlaylist);
  const allSongs = useSelector((state) => state.song.songs);
  const playlistSongs = useSelector((state) => state.playlists.playlistSongs);
  const truePlaylistSongs = allSongs?.filter((song) =>
    playlistSongs.some((ps) => ps.song_id === song.id)
  );

  const handleDelete = (playlistSongRelationshipId) => {
    dispatch(removePlaylistSong(playlistSongRelationshipId));
  };

  const handleAddSongClick = () => {
    history.push(`/add-playlist-song/${playlistId}`);
  };

  useEffect(() => {
    dispatch(getPlaylistByIdThunk(playlistId), dispatch(getAllSongsThunk()));
    dispatch(getPlaylistSongs(playlistId));
  }, [dispatch, playlistId]);

  return (
    <div className="albums-page">
      <div id="playlist-top-section">
        <h1> {playlist?.name} Playlist</h1>
        {userId === playlist?.user_id && (
          <button onClick={handleAddSongClick}>
            Add a Song to this Playlist
          </button>
        )}
      </div>
      <div className="album-wrapper">
        {truePlaylistSongs.map((song) => {
          const playlistSongRelationshipId = playlistSongs.find(
            (ps) => ps.song_id === song.id
          )?.id;

          return (
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
              </NavLink>
                <p>{`${song?.song_name}`}</p>
              {userId === playlist?.user_id && (
                <button
                  onClick={() => handleDelete(playlistSongRelationshipId)}
                >
                  Delete
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OnePlaylistPage;
