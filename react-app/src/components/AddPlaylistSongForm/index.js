import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { getAllSongsThunk } from "../../store/song";
import {
  addPlaylistSong,
  getPlaylistByIdThunk,
  getPlaylistSongs,
} from "../../store/playlists";

function AddPlaylistSong() {
  const dispatch = useDispatch();
  const { playlistId } = useParams();
  const history = useHistory();
  const songs = useSelector((state) => state.song.songs);
  const playlist = useSelector((state) => state.playlists.currentPlaylist);
  const playlistSongs = useSelector((state) => state.playlists.playlistSongs);
  const playlistSongIds = playlistSongs?.map((entry) => entry.song_id) || [];

  const [selectedSongs, setSelectedSongs] = useState([]);
  const [songIds, setSongIds] = useState([]);

  useEffect(() => {
    dispatch(getPlaylistByIdThunk(playlistId)).then(() => {
      dispatch(getAllSongsThunk());
      dispatch(getPlaylistSongs(playlistId));
    });
  }, [dispatch, playlistId]);

  const handleCheckboxChange = (songId) => {
    if (songIds.includes(songId)) {
      setSongIds(songIds.filter((id) => id !== songId));
    } else {
      setSongIds([...songIds, songId]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    for (let i = 0; i < songIds.length; i++) {
      dispatch(
        addPlaylistSong({
          playlist_id: playlistId,
          song_id: songIds[i],
        })
      );
    }

    setSongIds([]);
    history.push(`/playlists/${playlistId}`);
  };

  if (!songs || !playlistSongs) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Choose Songs to add to {playlist?.name} playlist</h1>
        {songs
          ?.filter((song) => !playlistSongIds?.includes(song.id))
          .map((song) => (
            <label key={song?.id}>
              <input
                type="checkbox"
                checked={songIds?.includes(song?.id)}
                onChange={() => handleCheckboxChange(song?.id)}
              />
              {song?.song_name}
            </label>
          ))}
        <button type="submit" disabled={songIds.length === 0}>
          Add Songs
        </button>
      </form>
    </div>
  );
}

export default AddPlaylistSong;
