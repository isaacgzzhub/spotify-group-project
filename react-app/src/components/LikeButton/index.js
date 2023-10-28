import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getLikesThunk,
  likeASongThunk,
  unlikeASongThunk,
} from "../../store/song";

function LikeButton({ songId }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);
  const likedSongs = useSelector((state) => state.song.likes);
  const [isLiked, setIsLiked] = useState(false);
  // const songId = 3 // we'll make this dynamic, passed in as a prop from parent song

  // populates likedSongs
  useEffect(() => {
    if (userId) {
      dispatch(getLikesThunk(userId));
    }
  }, [dispatch]);

  // sets state to true if the song is in user's liked songs list else false
  useEffect(() => {
    setIsLiked(likedSongs.some((obj) => obj.id === songId));
  }, [likedSongs]);

  const setLikedButtonState = () => {
    // if the song is already liked, dispatch action to unlike it (removing the record from UserLike in db) and set state to false(not liked)
    if (isLiked) {
      dispatch(unlikeASongThunk(songId, userId)).then(() => {
        setIsLiked(false);
      });
      // if the song is not liked, dispatch action to like it (adding the record from UserLike in db) and set state to true(liked)
    } else {
      dispatch(likeASongThunk(songId, userId)).then(() => {
        setIsLiked(true);
      });
    }
  };

  return (
    <button
      className="like-button"
      onClick={setLikedButtonState}
      style={{
        color: isLiked ? "green" : "red",
      }}
    >
      {isLiked ? "Liked" : "Like"}
    </button>
  );
}

export default LikeButton;
