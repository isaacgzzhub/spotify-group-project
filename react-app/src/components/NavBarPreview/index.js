import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function NavBarPreview({ activeSection }) {
  const albumsObj = useSelector((state) => state.albums);
  const albums = Object.values(albumsObj);
  console.log(albums);

  return (
    <div>
      {activeSection === "allAlbums" && (
        <div>
          <div className="album-tile-list">
            {/* Show the first five albums here */}
            {albums.slice(0, 5).map((album) => (
              <NavLink
                key={album.id}
                className="album-tile"
                to={`/albums/${album.id}`}
              >
                <img
                  className="album-img"
                  src={`${album.thumbnail_url}`}
                  alt="album-cover"
                  title={`${album.album_name}`}
                />
                <a>{`${album.album_name}`}</a>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBarPreview;
