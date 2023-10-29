import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllSongsThunk, getSongLikesThunk } from "../../store/song";
import LikeButton from "../LikeButton";
import DeleteSongButton from "../DeleteSongButton";
import "./Songs.css";

function SongsPage() {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.song.songs);
  const userLikes = useSelector((state) => state.song.likeCount);
  console.log(userLikes)

  useEffect(() => {
    dispatch(getAllSongsThunk());
    dispatch(getSongLikesThunk());
  }, [dispatch]);

  return (
    <div id="albums-page">
      <h1>Songs</h1>
      <div className="album-wrapper">
        {songs.map((song) => (
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
              <p>{userLikes.filter(likedSong => song.id === likedSong.song_id).length}<span>  <i class="fas fa-heart"></i></span></p>
            </NavLink>
            <LikeButton songId={song.id} className="like-button" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SongsPage;
