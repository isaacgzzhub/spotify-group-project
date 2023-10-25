import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getAllAlbumsThunk } from "../../store/albums";
import { removeAlbum } from "../../store/albums";
import Modal from "react-modal";
import "./MyAlbums.css"; // The commented out modal css at the top is causing there to be a square white box half way down the screen

function MyAlbumsPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllAlbumsThunk());
  }, [dispatch]);

  const userId = useSelector((state) => state.session.user.id);
  const albumsObj = useSelector((state) => state.albums);
  const albums = Object.values(albumsObj);
  const myAlbums = albums.filter((album) => album.user_id === userId);

  const handleUpdateClick = (albumId) => {
    history.push(`/albums/${albumId}/update`);
  };

  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = (albumId) => {
    setSelectedAlbumId(albumId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    dispatch(removeAlbum(selectedAlbumId));
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setSelectedAlbumId(null);
    setShowDeleteModal(false);
  };

  return (
    <div className="albums-page">
      <h1>My Albums</h1>
      <NavLink to="/albums/create-album" className="create-album-link">
        Create Album
      </NavLink>
      <div className="album-wrapper">
        {myAlbums.map((album) => (
          <div key={album.id}>
            <div className="album-tile">
              <NavLink className="album-tile" to={`/albums/${album.id}`}>
                <img
                  className="album-img"
                  src={`${album.thumbnail_url}`}
                  alt="album-cover"
                  title={`${album.album_name}`}
                />
                <a>{`${album.album_name}`}</a>
              </NavLink>
              <div className="button-wrapper">
                <button
                  className="update-button"
                  onClick={() => handleUpdateClick(album.id)}
                >
                  Update
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteClick(album.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="modal-content">
        <Modal
          isOpen={showDeleteModal}
          onRequestClose={handleCancelDelete}
          className="mng-modal"
          overlayClassName="overlay"
        >
          <div className="modal-content">
            <h2 className="modal-title">Confirm Delete</h2>
            <p className="modal-message">
              Are you sure you want to delete this album?
            </p>
            <div className="modal-buttons">
              <button
                className="modal-delete-button"
                onClick={handleConfirmDelete}
              >
                Yes (Delete Album)
              </button>
              <button
                className="modal-cancel-button"
                onClick={handleCancelDelete}
              >
                No (Keep Album)
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default MyAlbumsPage;
