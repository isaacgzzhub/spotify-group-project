import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getAlbumByIdThunk } from "../../store/albums";
import { getAllSongsThunk } from "../../store/song";
import "./OneAlbumPage.css";
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
        <h1> {album?.album_name} Album</h1>
        <img
          className="album-cover"
          src={`${album?.thumbnail_url}`}
          alt="album-cover"
          title={`${album?.album_name}`}
        />
        {/* make sure this navlink is right */}
        <NavLink to={`/albums/${album.id}/add-song`} className="add-song-to-album">
          {" "}
          Add a Song to this Album{" "}
        </NavLink>
      </div>

      <div className="album-wrapper">
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
