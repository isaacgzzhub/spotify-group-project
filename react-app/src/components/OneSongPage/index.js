import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getAlbumByIdThunk } from "../../store/albums";
import { getSongByIdThunk, getSongLikesThunk } from "../../store/song";
import AudioPlayer from "../AudioPlayer";
import LikeButton from "../LikeButton";


function OneSong() {
    const dispatch = useDispatch();
    const { songId } = useParams();
    const songs = useSelector((state) => state?.song?.songs)
    const song = useSelector((state) => state?.song?.songs[songId - 1])
    const userLikes = useSelector((state) => state.song.likeCount);

    useEffect(() => {
        dispatch(getSongByIdThunk(songId))
        dispatch(getSongLikesThunk());
    }, [dispatch])

    const handleSongLiked = (songId) => {
        dispatch(getSongLikesThunk());
      };

    return(
        <div className="one-album-container">
            <div id="album-top-section">
                <h1>{song?.song_name}</h1>
                <p className="artist">by {song?.artist}</p>
                <img
                    className="album-cover"
                    // For now as a test, the thumbnail_url is the url to our AWS S3 bucket with the url for our MP3, NOT THE IMAGE
                    src={`${song?.thumbnail_url}`}
                    alt="album-cover"
                    title={`${song?.song_name}`}
                    />
                <p>Released in {song?.release_year}</p>

                <p>
                {
                  userLikes.filter((likedSong) => song.id === likedSong.song_id)
                    .length
                }
                <span>
                  {" "}
                  <i class="fas fa-heart"></i>
                </span>
              </p>
              <LikeButton
              songId={song.id}
              className="like-button"
              onLike={handleSongLiked}
            />

                {/* Render AudioPlayer below the album cover for testing purposes for now, wait for the thumbnail_url to be available, otherwise a hard page refresh makes the audio player ghosted out */}
                {song?.thumbnail_url && <AudioPlayer songUrl={song?.thumbnail_url} />}
            </div>
        </div>

    )
}

export default OneSong;
