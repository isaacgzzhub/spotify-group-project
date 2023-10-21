import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { getAllSongsThunk } from "../../store/song";

function MySongsPage() {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.song.songs);
  const userId = useSelector((state) => state.session.user.id);

  useEffect(() => {
    dispatch(getAllSongsThunk());
  }, [dispatch]);

  const mySongs = songs.filter((song) => song.user_id === userId)

  return (
    <div id="albums-page">
      <h1>My Songs</h1>
      <div className="album-tile-list">
        {mySongs.map((song) => (
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
            <button>Update Song</button>
            <button>Delete</button>
          </NavLink>
        ))}
      </div>

      <NavLink to="/">Create Song</NavLink>
    </div>
  );
}

export default MySongsPage;
