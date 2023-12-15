import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

// Receive a prop named activeSection from the Navigation index.js (the parent), which is a string that indicates which nav link section is currently active
function NavBarPreview({ activeSection }) {
  const user = useSelector((state) => state.session.user);
  const albumsObj = useSelector((state) => state.albums);
  const albums = Object.values(albumsObj);
  const allSongs = useSelector((state) => state.song.songs)
  const likedSongs = useSelector((state) => state.song.likes)

  const mySongs = allSongs.filter((song) => song.user_id === user.id)
  const myAlbums = albums.filter((album) => album.user_id === user.id);

  return (
    <div className="nb-prev">
      {/* Check if the activeSection is "allAlbums" */}
      {activeSection === "allAlbums" && (
        <div>
          <div className="album-tile-list">
            {/* Show the first five albums here */}
            {albums.slice(0, 5).map((album) => (
              // conditional below to only render album if it exists
              album && (
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
              )
            ))}
          </div>
        </div>
      )}

      {activeSection === "myAlbums" && (
        <div>
          <div className="album-tile-list">
            {/* Show the first five myAlbums here */}
            {myAlbums.slice(0, 5).map(
              (album) =>
                album && (
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
                )
            )}
          </div>
        </div>
      )}

      {activeSection === "allSongs" && (
        <div>
          <div className="album-tile-list">
            {/* Show the first five albums here */}
            {allSongs.slice(0, 5).map((song) => (
              song && (
              <NavLink
                key={song.id}
                className="album-tile"
                to={`/songs/${song.id}`}
              >
                <img
                  className="album-img"
                  src={`${song.thumbnail_url}`}
                  alt="album-cover"
                  title={`${song.song_name}`}
                />
                <a>{`${song.song_name}`}</a>
              </NavLink>
              )
            ))}
          </div>
        </div>
      )}

      {activeSection === "mySongs" && (
        <div>
          <div className="album-tile-list">
            {/* Show the first five albums here */}
            {mySongs.slice(0, 5).map((song) => (
              song && (
              <NavLink
                key={song.id}
                className="album-tile"
                to={`/songs/${song.id}`}
              >
                <img
                  className="album-img"
                  src={`${song.thumbnail_url}`}
                  alt="album-cover"
                  title={`${song.song_name}`}
                />
                <a>{`${song.song_name}`}</a>
              </NavLink>
              )
            ))}
          </div>
        </div>
      )}

      {activeSection === "likedSongs" && (
        <div>
          <div className="album-tile-list">
            {/* Show the first five albums here */}
            {likedSongs.slice(0, 5).map((song) => (
              song && (
              <NavLink
                key={song.id}
                className="album-tile"
                to={`/songs/${song.id}`}
              >
                <img
                  className="album-img"
                  src={`${song.thumbnail_url}`}
                  alt="album-cover"
                  title={`${song.song_name}`}
                />
                <a>{`${song.song_name}`}</a>
              </NavLink>
              )
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default NavBarPreview;
