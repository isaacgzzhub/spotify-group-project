import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPlaylistsThunk } from "../../store/playlists";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function MyPlaylistsPage() {
  const dispatch = useDispatch();
  const history = useHistory()
  const userId = useSelector((state) => state.session.user.id);
  const playlists = useSelector((state) => state.playlists.allPlaylists)

  useEffect(() => {
    dispatch(getMyPlaylistsThunk(userId));
  }, [dispatch]);



  return (
    <div className="my-playlist-page">
      <h1>MY PLAYLISTS</h1>
      <div>
        {playlists?.map((playlist) => (
            <div key={playlist?.id}>
                <h2>
                <NavLink className="playlist-name" to={`/playlists/${playlist?.id}`}>
                    {`${playlist?.name}`}
                </NavLink>
                </h2>
            </div>
        ))}
      </div>

    </div>
  );
}

export default MyPlaylistsPage;
