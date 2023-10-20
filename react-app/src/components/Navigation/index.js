import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import NavBarPreview from "../NavBarPreview";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [activeSection, setActiveSection] = useState(null); // initiate a state varaible and set it to null initially to keep track of which section is active

  // Set the clicked navbar link to the actionSection state set above
  const handleNavLinkClick = (section) => {
    setActiveSection(section);
  };

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
        {/* For each NavLink, we attach an onClick handler that calls handleNavLinkClick with a string argument.
            This argument is used to set the activeSection, determining which section is displayed in the NavBarPreview component. */}
        <NavLink
          to="/songs"
          activeClassName="active-link"
          onClick={() => handleNavLinkClick("allSongs")}
        >
          All Songs
        </NavLink>
        <NavLink
          to="/mysongs"
          activeClassName="active-link"
          onClick={() => handleNavLinkClick("yourSongs")}
        >
          My Songs
        </NavLink>
        <NavLink
          to="/likedsongs"
          activeClassName="active-link"
          onClick={() => handleNavLinkClick("likedSongs")}
        >
          Liked Songs
        </NavLink>
        <NavLink
          to="/albums"
          activeClassName="active-link"
          onClick={() => handleNavLinkClick("allAlbums")}
        >
          All Albums
        </NavLink>
        <NavLink
          to="/myalbums"
          activeClassName="active-link"
          onClick={() => handleNavLinkClick("yourAlbums")}
        >
          My Albums
        </NavLink>
        <NavLink
          to="/playlists"
          activeClassName="active-link"
          onClick={() => handleNavLinkClick("allPlaylists")}
        >
          All Playlists
        </NavLink>
        <NavLink
          to="/myplaylists"
          activeClassName="active-link"
          onClick={() => handleNavLinkClick("yourPlaylists")}
        >
          My Playlists
        </NavLink>
      </div>
      {/* Pass the activeSection state variable to the child component, NavBarPreview */}
      <NavBarPreview activeSection={activeSection} />
    </div>
  );
}

export default Navigation;
