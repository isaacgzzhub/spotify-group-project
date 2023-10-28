// constants
const GET_SONGS = "song/GET_SONGS";
const GET_SONG_BY_ID = "song/GET_SONG_BY_ID";
const CREATE_SONG = "song/CREATE_SONG";
const EDIT_SONG = "song/EDIT_SONG";
const DELETE_SONG = "song/DELETE_SONG";
const GET_LIKES = "song/GET_LIKES";
const LIKE_A_SONG = "song/LIKE_A_SONG";
const UNLIKE_A_SONG = "song/UNLIKE_A_SONG";

const getAllSongs = (songs) => ({
  type: GET_SONGS,
  payload: songs,
});

const getSongById = (song) => ({
  type: GET_SONG_BY_ID,
  payload: song,
});

const createSong = (data) => ({
  type: CREATE_SONG,
  payload: data,
});

const editSong = (songId) => ({
  type: EDIT_SONG,
  payload: songId,
});

const deleteSong = (songId) => ({
  type: DELETE_SONG,
  payload: songId,
});

const getLikes = (likes) => ({
  type: GET_LIKES,
  payload: likes,
});

const likeSong = (data) => ({
  type: LIKE_A_SONG,
  payload: data,
});

const unlikeSong = (data) => ({
  type: UNLIKE_A_SONG,
  payload: data,
});

export const getAllSongsThunk = () => async (dispatch) => {
  const response = await fetch("/api/songs/");

  if (response.ok) {
    const songs = await response.json();
    if (songs.errors) {
      return songs.errors;
    }

    dispatch(getAllSongs(songs));
  }
};

export const getSongByIdThunk = (songId) => async (dispatch) => {
  const response = await fetch(`/api/songs/${songId}`);

  if (response.ok) {
    const song = await response.json();
    if (song.errors) {
      return song.errors;
    }

    dispatch(getSongById(song));
  }
};

export const createSongThunk = (payload) => async (dispatch) => {
  const response = await fetch(`/api/songs/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  try {
    const song = await response.json();
    dispatch(createSong(song));
    return song
  } catch(error) {
    return error
  }
};

export const editSongThunk = (songId, payload) => async (dispatch) => {
  const response = await fetch(`/api/songs/${songId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  try {
    const song = await response.json();
    dispatch(editSong(song));
    return song
  } catch(error) {
    return error
  }
};

export const deleteSongThunk = (songId) => async (dispatch) => {
  const response = await fetch(`/api/songs/${songId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const deletedSong = await response.json();
    dispatch(deleteSong(deletedSong.id))
  } else {
    console.log('delete failed')
  }
};

export const getLikesThunk = (userId) => async (dispatch) => {
  const response = await fetch(`/api/songs/likes/${userId}`);

  if (response.ok) {
    const likes = await response.json();
    if (likes.errors) {
      return likes.errors;
    }

    dispatch(getLikes(likes));
  }
};

export const likeASongThunk = (songId, userId) => async (dispatch) => {
  const response = await fetch(`/api/songs/${songId}/like/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // body: JSON.stringify(payload),
  });

  if (response.ok) {
    const likes = await response.json();
    if (likes.errors) {
      return likes.errors;
    }
    dispatch(likeSong(likes));
  }
};

export const unlikeASongThunk = (songId, userId) => async (dispatch) => {
  const response = await fetch(`/api/songs/${songId}/like/${userId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    // body: JSON.stringify(payload),
  });

  if (response.ok) {
    const likes = await response.json();
    if (likes.errors) {
      return likes.errors;
    }
    dispatch(unlikeSong(likes));
  }
};

const initialState = { songs: [], song: null, likes: [], likedSong: null, createdSong: null, editedSong: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_SONGS:
      return { ...state, songs: action.payload };
    case GET_SONG_BY_ID:
      return { ...state, song: action.payload };
    case CREATE_SONG:
      return { ...state, createdSong: action.payload };
    case DELETE_SONG:
      const updatedSongs = state.songs.filter(song => song.id !== action.payload)
      return { ...state, songs: updatedSongs, deletedSong: action.payload };
    case GET_LIKES:
      return { ...state, likes: action.payload };
    case LIKE_A_SONG:
      return { ...state, likedSong: action.payload };
    case UNLIKE_A_SONG:
      return { ...state, likedSong: action.payload };
    case EDIT_SONG:
      return { ...state, editedSong: action.payload };
    default:
      return state;
  }
}
