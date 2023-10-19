// constants
const GET_SONGS = "song/GET_SONGS";
const GET_SONG_BY_ID = "song/GET_SONG_BY_ID";
const CREATE_SONG = "song/CREATE_SONG";
const EDIT_SONG = "song/EDIT_SONG";
const DELETE_SONG = "song/DELETE_SONG";

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

export const getAllSongsThunk = () => async (dispatch) => {
  const response = await fetch("/api/songs/");

  if (response.ok) {
    console.log("hello");
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

const initialState = { songs: [], song: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_SONGS:
      return { ...state, songs: action.payload };
    case GET_SONG_BY_ID:
      return { ...state, song: action.payload };
    default:
      return state;
  }
}
