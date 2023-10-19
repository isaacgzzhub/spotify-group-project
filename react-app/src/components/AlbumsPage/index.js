import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAllAlbumsThunk } from "../../store/albums";

function AlbumsPage() {
  const dispatch = useDispatch();
  // const songs = useSelector((state) => state.song.songs);

  useEffect(() => {
    dispatch(getAllAlbumsThunk());
  }, [dispatch]);

  return (
    <>
      <h1>Hi</h1>
    </>
  );
}

export default AlbumsPage;
