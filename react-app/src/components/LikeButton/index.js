import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikesThunk, likeASongThunk, unlikeASongThunk } from "../../store/song";

function LikeButton({ songId }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id)
  const likedSongs = useSelector((state) => state.song.likes)
  const [isLiked, setIsLiked] = useState()
  // const songId = 3 // we'll make this dynamic, passed in as a prop from parent song

  // state changes arent working
  useEffect(() => {
    dispatch(getLikesThunk(userId));

    if (likedSongs.some(obj => obj.id === songId)) {
      setIsLiked(true)
    } else {
      setIsLiked(false)
    }
  }, [dispatch]);

  const setLikedButtonState = () => {
    console.log(likedSongs)
    // if songId of the selected song is in the likedSong list, we set the isLiked state to true
    if (likedSongs.some(obj => obj.id === songId)) {
      dispatch(unlikeASongThunk(songId, userId))
      setIsLiked(false)
    } else {
      dispatch(likeASongThunk(songId, userId))
      setIsLiked(true)
    }
  }

  return (
    <button
      onClick={setLikedButtonState}
      style={{ color: isLiked ? 'green' : 'red' }}
    >
      {isLiked ? 'Liked' : 'Like'}
    </button>
  );
}

export default LikeButton;
