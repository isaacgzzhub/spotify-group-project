import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { getAllSongsThunk } from "../../store/song";
import DeleteSongButton from "../DeleteSongButton";
import LikeButton from "../LikeButton";

function MySongsPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const songs = useSelector((state) => state.song.songs);
  const userId = useSelector((state) => state.session.user.id);

  useEffect(() => {
    dispatch(getAllSongsThunk());
  }, [dispatch]);

  const mySongs = songs.filter((song) => song.user_id === userId)

  const handleUpdateClick = (songId) => {
    history.push(`/songs/${songId}/update`);
  };

  return (
    <div id="albums-page">
      <h1>My Songs</h1>
      <div className="album-tile-list">
        {mySongs.map((song) => (
          <div>
            <NavLink
              key={song.id}
              className="album-tile"
              to={`/songs/${song.id}`}
            >
              <img
                className="album-img"
                src={`${song.thumbnail_url}`}
                alt="album-cover"
                title={`${song.song_name}`}
              />
              <a>{`${song.song_name}`}</a>
            </NavLink>
            <LikeButton songId={song.id} />
            <button onClick={()=> history.push(`/songs/${song.id}/update`)}>Update Song</button>
            <DeleteSongButton songUserId={song.user_id} songId={song.id} />
          </div>
        ))}
      </div>

      <NavLink to="/">Create Song</NavLink>
    </div>
  );
}

export default MySongsPage;
