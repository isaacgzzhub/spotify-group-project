import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAllSongsThunk } from "../../store/song";

function SongsPage() {
  const dispatch = useDispatch();
  // const songs = useSelector((state) => state.song.songs);

  useEffect(() => {
    dispatch(getAllSongsThunk());
  }, [dispatch]);

  return (
    <>
      <h1>Hi</h1>
    </>
  );
}

export default SongsPage;
