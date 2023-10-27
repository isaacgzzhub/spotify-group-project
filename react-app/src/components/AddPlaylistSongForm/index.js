import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getAllSongsThunk } from "../../store/song";

function AddPlaylistSong() {
    const dispatch = useDispatch();
    const { playlistId } = useParams()
    const songs = useSelector((state) => state.song.songs);

    useEffect(() => {
        dispatch(getAllSongsThunk())
    }, [dispatch])

    return (
        <div>
            <h1>HIII</h1>
        </div>
    )



}

export default AddPlaylistSong
