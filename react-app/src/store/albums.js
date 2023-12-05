// Action Types
const LOAD = "albums/LOAD";
const GET_ALBUM = "albums/GET_ALBUM";
const ADD_ALBUM = "albums/ADD_ALBUM";
const UPDATE_ALBUM = "albums/UPDATE_ALBUM";
const DELETE_ALBUM = "albums/DELETE_ALBUM";
const GET_USER_ALBUMS = "albums/GET_USER_ALBUMS"

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
const getUserAlbums = (userId) => ({
  type: GET_USER_ALBUMS,
  payload: userId
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

export const getUserAlbumsThunk = (userId) => async (dispatch) => {
  const response = await fetch(`/api/albums/user/${userId}`);

  if (response.ok) {
    const albums = await response.json();
    if (albums.errors) {
      return albums.errors;
    }

    dispatch(getUserAlbums(albums));
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
  const response = await fetch("/api/albums/create-album", {
    method: "POST",
    // headers: { "Content-Type": "application/json" },
    body: payload,
  });

  try {
    const createdAlbum = await response.json();
    dispatch(addAlbum(createdAlbum));
    return createdAlbum
  } catch(error) {
    return error
  }

//   if (response.ok) {
//     const createdAlbum = await response.json();
//     dispatch(addAlbum(createdAlbum));
//   }
};

export const editAlbum = (payload) => async (dispatch) => {
  const response = await fetch(`/api/albums/${payload.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  try {
    const updatedAlbum = await response.json();
    dispatch(updateAlbum(updatedAlbum));
    return updatedAlbum
  } catch(error) {
    return error
  }

  // if (response.ok) {
  //   const updatedAlbum = await response.json();
  //   dispatch(updateAlbum(updatedAlbum));
  //   return updatedAlbum;
  // }
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
      return newState;

    case GET_ALBUM:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;

    case GET_USER_ALBUMS:
      newState = { ...state };
      newState["userAlbums"] = action.payload;
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
