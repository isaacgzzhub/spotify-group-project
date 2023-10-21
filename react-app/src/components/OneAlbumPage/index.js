import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getAlbumByIdThunk } from "../../store/albums";
import { getAllSongsThunk } from "../../store/song";
import Modal from "react-modal";

function OneAlbum() {
  const dispatch = useDispatch();
  const { albumId } = useParams();
  const userId = useSelector((state) => state.session.user.id);
  const album = useSelector((state) => state.albums[albumId]);
  const allSongs = useSelector((state) => state.song.songs);
  const albumSongs = allSongs?.filter((song) => song?.album_id === album?.id);

  useEffect(() => {
    dispatch(getAlbumByIdThunk(albumId), dispatch(getAllSongsThunk()));
  }, [dispatch, albumId]);

  return (
    <div className="one-album-container">
      <div id="album-top-section">
        <h1> {album?.album_name} </h1>
        <img
          id="album-cover"
          src={`${album?.thumbnail_url}`}
          alt="album-cover"
          title={`${album?.album_name}`}
        />
        {/* make sure this navlink is right */}
        <NavLink to='/songs/create'> Add a Song </NavLink>
      </div>

      <div id="songs-bottom-section">
        {albumSongs?.map((song) => (
          <NavLink
            key={song?.id}
            className="album-tile"
            to={`/songs/${song?.id}`}
          >
            <img
              className="album-img"
              src={`${song?.thumbnail_url}`}
              alt="album-cover"
              title={`${song?.song_name}`}
            />
            <div>{`${song?.song_name}`}</div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default OneAlbum;
