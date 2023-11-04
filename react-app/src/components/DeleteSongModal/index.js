import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import { deleteSongThunk } from '../../store/song';

function DeleteSongModal({ songId }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal()

  const handleDeleteClick = () => {
    dispatch(deleteSongThunk(songId));
    closeModal();
    history.push("/mysongs")
  };

  const handleClick = () => {
    closeModal();
  };

  return (
    <div>
      <div>Confirm delete</div>
      <div>Are you sure you want to remove this song?</div>
      <button onClick={handleDeleteClick}>Yes (Delete Song)</button>
      <button onClick={handleClick}>No (Keep Song)</button>
    </div>
  )
}

export default DeleteSongModal;
