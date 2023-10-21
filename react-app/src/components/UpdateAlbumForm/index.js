import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllAlbumsThunk } from "../../store/albums";

function UpdateAlbum() {
  const dispatch = useDispatch();


  return (
    <div id="albums-page">
      <h1>Edit Album Form</h1>

    </div>
  );
}

export default UpdateAlbum;
