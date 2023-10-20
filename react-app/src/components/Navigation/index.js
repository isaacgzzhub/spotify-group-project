import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import NavBarPreview from "../NavBarPreview";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const [activeSection, setActiveSection] = useState(null);

  const handleClick = (section) => {
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
        <NavLink
          to="/songs"
          activeClassName="active-link"
          onClick={() => handleClick("allSongs")}
        >
          All Songs
        </NavLink>
        <NavLink
          to="/mysongs"
          activeClassName="active-link"
          onClick={() => handleClick("yourSongs")}
        >
          Your Songs
        </NavLink>
        <NavLink
          to="/likedsongs"
          activeClassName="active-link"
          onClick={() => handleClick("likedSongs")}
        >
          Liked Songs
        </NavLink>
        <NavLink
          to="/albums"
          activeClassName="active-link"
          onClick={() => handleClick("allAlbums")}
        >
          All Albums
        </NavLink>
        <NavLink
          to="/myalbums"
          activeClassName="active-link"
          onClick={() => handleClick("yourAlbums")}
        >
          Your Albums
        </NavLink>
        <NavLink
          to="/playlists"
          activeClassName="active-link"
          onClick={() => handleClick("allPlaylists")}
        >
          All Playlists
        </NavLink>
        <NavLink
          to="/myplaylists"
          activeClassName="active-link"
          onClick={() => handleClick("yourPlaylists")}
        >
          Your Playlists
        </NavLink>
      </div>
      {/* Display preview based on active section */}
      <NavBarPreview activeSection={activeSection} />
    </div>
  );
}

export default Navigation;
