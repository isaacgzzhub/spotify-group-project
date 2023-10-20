import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="navbar-container">
      <div id="home-profile">
        {isLoaded && (
          <div>
            <ProfileButton user={sessionUser} />
          </div>
        )}
        <div>
          <NavLink exact to="/">
            Home
          </NavLink>
        </div>
      </div>

      <div id="nav-links">
        <NavLink to="/songs">All Songs</NavLink>
        <NavLink to="/mysongs">Your Songs</NavLink>
        <NavLink to="/likedsongs">Liked Songs</NavLink>
        <NavLink to="/albums">All Albums</NavLink>
        <NavLink to="/myalbums">Your Albums</NavLink>
        <NavLink to="/playlists">All Playlists</NavLink>
        <NavLink to="/myplaylists">Your Playlists</NavLink>
      </div>
    </div>
  );
}

export default Navigation;
