import { csrfFetch } from "./csrf";

// Action Types
const LOAD = "albums/LOAD";
const GET_ALBUM = "albums/GET_ALBUM";
const ADD_ALBUM = "albums/ADD_ALBUM";
const UPDATE_ALBUM = "albums/UPDATE_ALBUM";
const DELETE_ALBUM = "albums/DELETE_ALBUM";

// Action Creators
const load = (allAlbums) => ({
  type: LOAD,
  payLoad: allAlbums,
});
const getAlbum = (album) => ({
  type: GET_ALBUM,
  payLoad: album,
});
const addAlbum = (album) => ({
  type: ADD_ALBUM,
  payLoad: album,
});
const updateAlbum = (album) => ({
  type: UPDATE_ALBUM,
  payLoad: album,
});

// Thunk Middleware

// Reducer Function
