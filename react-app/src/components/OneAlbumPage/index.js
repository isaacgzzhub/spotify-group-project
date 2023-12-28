import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getAlbumByIdThunk } from "../../store/albums";
import { getAllSongsThunk } from "../../store/song";
import AudioPlayer from "../AudioPlayer";
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
          // For now as a test, the thumbnail_url is the url to our AWS S3 bucket with the url for our MP3, NOT THE IMAGE
          src={`${album?.thumbnail_url}`}
          alt="album-cover"
          title={`${album?.album_name}`}
        />
        {/* Render AudioPlayer below the album cover for testing purposes for now, wait for the thumbnail_url to be available, otherwise a hard page refresh makes the audio player ghosted out */}
        {album?.thumbnail_url && <AudioPlayer songUrl={album?.thumbnail_url} />}

        {album?.user_id === userId && (
          <NavLink
            to={`/albums/${album.id}/add-song`}
            className="add-song-to-album"
          >
            {" "}
            Add a Song to this Album{" "}
          </NavLink>
        )}
      </div>

      <div className="album-wrapper">
        {albumSongs?.map((song) => (
          <div>
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
          </NavLink>
            <p>{`${song?.song_name}`}</p>
            </div>
        ))}
      </div>
    </div>
  );
}

export default OneAlbum;
