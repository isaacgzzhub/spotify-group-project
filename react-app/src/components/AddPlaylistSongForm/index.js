import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { getAllSongsThunk } from "../../store/song";
import { addPlaylistSong, getPlaylistByIdThunk } from "../../store/playlists";

function AddPlaylistSong() {
    const dispatch = useDispatch();
    const { playlistId } = useParams()
    const history = useHistory()
    const songs = useSelector((state) => state.song.songs);
    const playlist = useSelector((state) => state.playlists.currentPlaylist);
    console.log(playlist)

    const [ selectedSongs, setSelectedSongs ] = useState([]);
    const [ songIds, setSongIds ] = useState([])

    useEffect(() => {
        dispatch(getAllSongsThunk());
        dispatch(getPlaylistByIdThunk(playlistId))
    }, [dispatch, playlistId])

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
            console.log('HELLOOO')
            dispatch(addPlaylistSong({
                playlist_id: playlistId,
                song_id: songIds[i]
            }))
        }

        setSongIds([]);
        history.push(`/playlists/${playlistId}`)
    };


    return (
      <div>
        <form onSubmit={handleSubmit}>
          <h1>Choose Songs to add to {playlist?.name} playlist</h1>
          {songs?.map((song) => (
          <label key={song?.id}>
            <input
              type="checkbox"
              checked={songIds?.includes(song?.id)}
              onChange={() => handleCheckboxChange(song?.id)}
            />
            {song.song_name}
          </label>
        ))}
        <button type="submit" disabled={songIds.length === 0}>
          Add Songs
        </button>
        </form>
      </div>
    );



}

export default AddPlaylistSong
