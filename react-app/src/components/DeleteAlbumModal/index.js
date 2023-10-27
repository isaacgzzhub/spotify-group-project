import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import { removeAlbum } from '../../store/albums';

function DeleteAlbumModal({ albumId }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal()

  const handleDeleteClick = () => {
    dispatch(removeAlbum(albumId));
    closeModal();
    history.push("/myalbums")
  };

  const handleClick = () => {
    closeModal();
  };

  return (
    <div>
      <div>Confirm delete</div>
      <div>Are you sure you want to remove this album?</div>
      <button onClick={handleDeleteClick}>Yes (Delete Album)</button>
      <button onClick={handleClick}>No (Keep Album)</button>
    </div>
  )
}

export default DeleteAlbumModal;
