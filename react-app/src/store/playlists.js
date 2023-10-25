// Action Types
const LOAD = "playlists/LOAD";
const GET_PLAYLIST = "playlists/GET_PLAYLIST";
const GET_SONGS = "playlists/GET_SONGS";
const ADD_SONG = "playlists/ADD_SONG";
const DELETE_SONG = "playlists/DELETE_SONG";

// Action Creators
const load = (allPlaylists) => ({
  type: LOAD,
  payload: allPlaylists,
});
const getPlaylist = (playlist) => ({
  type: GET_PLAYLIST,
  payload: playlist,
});
const getSongs = (songs) => ({
  type: GET_SONGS,
  payload: songs,
});
const addSong = (playlistSongId) => ({
  type: ADD_SONG,
  payload: playlistSongId,
});
const deleteSong = (playlistSongId) => ({
  type: DELETE_SONG,
  payload: playlistSongId,
});

// Thunk Middleware

export const getAllPlaylistsThunk = () => async (dispatch) => {
  const response = await fetch("/api/playlists/");

  if (response.ok) {
    const playlists = await response.json();
    if (playlists.errors) {
      return playlists.errors;
    }

    dispatch(load(playlists));
  }
};

export const getMyPlaylistsThunk = (userId) => async (dispatch) => {
  const response = await fetch(`/api/playlists/user/${userId}`);

  if (response.ok) {
    const playlists = await response.json();
    if (playlists.errors) {
      return playlists.errors;
    }

    dispatch(load(playlists));
  }
};

export const getPlaylistByIdThunk = (playlistId) => async (dispatch) => {
  const response = await fetch(`/api/playlists/${playlistId}`);

  if (response.ok) {
    const playlist = await response.json();
    if (playlist.errors) {
      return playlist.errors;
    }

    dispatch(getPlaylist(playlist));
  }
};

export const getPlaylistSongs = (playlistId) => async (dispatch) => {
  const response = await fetch(`/api/playlists/${playlistId}/songs`);

  if (response.ok) {
    const songs = await response.json();
    dispatch(getSongs(songs));
  }
};

export const addPlaylistSong = (payload) => async (dispatch) => {
  const response = await fetch(`/api/playlists/${playlistId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const addedSong = await response.json();
    dispatch(addSong(addedSong));
  }
};

export const removePlaylistSong = (playlistId) => async (dispatch) => {
  const response = await fetch(`/api/playlists/${playlistId}`, {
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
