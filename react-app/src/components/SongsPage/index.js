import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllSongsThunk } from "../../store/song";
import LikeButton from "../LikeButton";
import DeleteSongButton from "../DeleteSongButton";

function SongsPage() {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.song.songs);

  useEffect(() => {
    dispatch(getAllSongsThunk())
  }, [dispatch])

  return (
    <div id='albums-page'>
      <h1>Songs</h1>
      <div className='album-tile-list'>
        {
          songs.map(song => (
            <div>
              <NavLink key={song.id} className='album-tile' to={`/songs/${song.id}`}>
              <img className='album-img' src={`${song.thumbnail_url}`} alt='album-cover' title={`${song.song_name}`}/>
              <a>{`${song.song_name}`}</a>
              </NavLink>
              <LikeButton songId={song.id}/>
              <DeleteSongButton songUserId={song.user_id} songId={song.id} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default SongsPage;
