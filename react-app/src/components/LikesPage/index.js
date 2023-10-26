import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getLikesThunk } from "../../store/song";
import DeleteSongButton from "../DeleteSongButton";

function LikesPage() {
  const dispatch = useDispatch();
  const history = useHistory()
  const likes = useSelector((state) => state.song.likes);
  const userId = useSelector((state) => state.session.user.id);

  useEffect(() => {
    dispatch(getLikesThunk(userId));
  }, [dispatch]);

  return (
    <div id="albums-page">
      <h1>Liked Songs</h1>
      <div className="album-tile-list">
        {likes.map((song) => (
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
            <button onClick={()=> history.push(`/songs/${song.id}/update`)}>Update Song</button>
            <DeleteSongButton songUserId={song.user_id} songId={song.id} />
          </div>
        ))}
      </div>

      <NavLink to="/">Create Song</NavLink>
    </div>
  );
}

export default LikesPage;
