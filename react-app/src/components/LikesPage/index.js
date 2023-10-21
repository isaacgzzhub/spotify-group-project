import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getLikesThunk } from "../../store/song";

function LikesPage() {
  const dispatch = useDispatch();
  const likes = useSelector((state) => state.song.likes);
  const userId = useSelector((state) => state.session.user.id);
  console.log(likes);

  useEffect(() => {
    dispatch(getLikesThunk(userId));
  }, [dispatch]);

  return (
    <div id="albums-page">
      <h1>Liked Songs</h1>
      <div className="album-tile-list">
        {likes.map((song) => (
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

export default LikesPage;
