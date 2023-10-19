// Action Types
const LOAD = "albums/LOAD";
const GET_ALBUM = "albums/GET_ALBUM";
const ADD_ALBUM = "albums/ADD_ALBUM";
const UPDATE_ALBUM = "albums/UPDATE_ALBUM";
const DELETE_ALBUM = "albums/DELETE_ALBUM";

// Action Creators
const load = (allAlbums) => ({
  type: LOAD,
  payload: allAlbums,
});
const getAlbum = (album) => ({
  type: GET_ALBUM,
  payload: album,
});
const addAlbum = (album) => ({
  type: ADD_ALBUM,
  payload: album,
});
const updateAlbum = (albumId) => ({
  type: UPDATE_ALBUM,
  payload: albumId,
});
const deleteAlbum = (albumId) => ({
  type: DELETE_ALBUM,
  payload: albumId,
});

// Thunk Middleware

export const getAllAlbumsThunk = () => async (dispatch) => {
  const response = await fetch("/api/albums/");

  if (response.ok) {
    const albums = await response.json();
    if (albums.errors) {
      return albums.errors;
    }

    dispatch(load(albums));
  }
};

export const getAlbumByIdThunk = (albumId) => async (dispatch) => {
  const response = await fetch(`/api/albums/${albumId}`);

  if (response.ok) {
    const album = await response.json();
    if (album.errors) {
      return album.errors;
    }

    dispatch(getAlbum(album));
  }
};

export const createAlbum = (payload) => async (dispatch) => {
  const response = await fetch("/api/albums", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const createdAlbum = await response.json();
    dispatch(addAlbum(createdAlbum));
  }
};

export const editAlbum = (payload) => async (dispatch) => {
  const response = await fetch(`/api/albums/${payload.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const updatedAlbum = await response.json();
    dispatch(updateAlbum(updatedAlbum));
    return updatedAlbum;
  }
};

export const removeAlbum = (albumId) => async (dispatch) => {
  const response = await fetch(`/api/albums/${albumId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteAlbum(albumId));
  }
};

// Reducer Function

const initialState = {};

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case LOAD:
      newState = {};
      action.payload.forEach((album) => {
        newState[album.id] = album;
      });
      console.log(newState);
      return newState;

    case GET_ALBUM:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;

    case ADD_ALBUM:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;

    case UPDATE_ALBUM:
      if (!action.payload.id) return state;
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;

    case DELETE_ALBUM:
      newState = { ...state };
      delete newState[action.payload];
      return newState;

    default:
      return state;
  }
}
