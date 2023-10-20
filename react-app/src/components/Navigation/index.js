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
        <div>
          <NavLink exact to="/">
            <img src="/spotify-logo2.png" alt="Home" className="home-logo" />
          </NavLink>
        </div>
        {isLoaded && (
          <div>
            <ProfileButton user={sessionUser} />
          </div>
        )}
      </div>

      <div id="nav-links">
        <NavLink to="/songs" activeClassName="active-link">
          All Songs
        </NavLink>
        <NavLink to="/mysongs" activeClassName="active-link">
          Your Songs
        </NavLink>
        <NavLink to="/likedsongs" activeClassName="active-link">
          Liked Songs
        </NavLink>
        <NavLink to="/albums" activeClassName="active-link">
          All Albums
        </NavLink>
        <NavLink to="/myalbums" activeClassName="active-link">
          Your Albums
        </NavLink>
        <NavLink to="/playlists" activeClassName="active-link">
          All Playlists
        </NavLink>
        <NavLink to="/myplaylists" activeClassName="active-link">
          Your Playlists
        </NavLink>
      </div>
    </div>
  );
}

export default Navigation;
