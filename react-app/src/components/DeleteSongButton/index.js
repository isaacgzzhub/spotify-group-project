import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSongThunk } from "../../store/song";
import OpenModalButton from "../OpenModalButton";
import DeleteSongModal from "../DeleteSongModal";

function DeleteSongButton({ songUserId, songId }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);

  const songOwnedByUser = () => {
    /*if the song's user_id passed down as a prop is the same as the current logged
    in user, return true and show delete button*/
    if (songUserId === userId) {
      return true;
      // otherwise, return false and don't render button
    } else {
      return false;
    }
  };

  // const handleClick = () => {
  //   dispatch(deleteSongThunk(songId))
  // }

  if (songOwnedByUser()) {
    return (
      <OpenModalButton
                  buttonText="Delete"
                  modalComponent={<DeleteSongModal songId={songId}/>}
                />
    );
  } else {
    return null;
  }
}

export default DeleteSongButton;
