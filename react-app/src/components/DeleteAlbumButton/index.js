import React from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import DeleteAlbumModal from "../DeleteAlbumModal";

function DeleteAlbumButton({ albumId }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);

  return (
    <OpenModalButton
      buttonText="Delete"
      modalComponent={<DeleteAlbumModal albumId={albumId}/>}
    />
  );
}

export default DeleteAlbumButton;
