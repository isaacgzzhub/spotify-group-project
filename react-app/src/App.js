import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import MySongsPage from "./components/MySongsPage";
import SongsPage from "./components/SongsPage";
import AlbumsPage from "./components/AlbumsPage";
import MyAlbumsPage from "./components/MyAlbumsPage";
import UpdateAlbum from "./components/UpdateAlbumForm";
import AlbumForm from "./components/AlbumForm";
import OneAlbum from "./components/OneAlbumPage";
import LikesPage from "./components/LikesPage";
import LikeButton from "./components/LikeButton";
import CreateSongForm from "./components/CreateSongForm";
import PlaylistsPage from "./components/PlaylistsPage";
import MyPlaylistsPage from "./components/MyPlaylistsPage";
import OnePlaylistPage from "./components/OnePlaylistPage";
import EditSongForm from "./components/EditSongForm";
import HomeRedirectPage from "./components/HomeRedirectPage";
import AudioPlayer from "./components/AudioPlayer";
import AddPlaylistSong from "./components/AddPlaylistSongForm";
import AddAlbumSong from "./components/AddAlbumSong";
import OneSong from "./components/OneSongPage";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const rootStyles = user
  ? {
      border: 'solid black 1px',
      padding: '10px',
      borderRadius: '10px',
      fontFamily: '"Nunito", sans-serif',
      background: 'linear-gradient(to bottom, rgb(7, 44, 3), #000000)',
      backgroundAttachment: 'fixed',
      marginLeft: '25.5%',
    }
  : {};

  if (isLoaded) {
    if (!user) {
      return <HomeRedirectPage />;
    }
  }

  return (
    <div style={rootStyles}>
      {isLoaded && (
      <Navigation isLoaded={isLoaded} />
      )}
      <div style={{ paddingBottom: "100px" }}>
        {isLoaded && (
          <Switch>
            <Route path="/login">
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route path="/mysongs">
              <MySongsPage />
            </Route>
            <Route path="/likes">
              <LikesPage />
            </Route>
            <Route path="/testlikebutton">
              <LikeButton />
            </Route>
            <Route path="/songs/:songId/update">
              <EditSongForm />
            </Route>
            <Route path="/songs/create">
              <CreateSongForm />
            </Route>
            <Route path="/songs/:songId">
              <OneSong />
            </Route>
            <Route path="/songs">
              <SongsPage />
            </Route>
            <Route path="/albums/create-album">
              <AlbumForm />
            </Route>
            <Route path="/myalbums">
              <MyAlbumsPage />
            </Route>
            <Route path="/albums/:albumId/update">
              <UpdateAlbum />
            </Route>
            <Route path="/albums/:albumId/add-song">
              <AddAlbumSong />
            </Route>
            <Route path="/albums/:albumId">
              <OneAlbum />
            </Route>
            <Route path="/albums">
              <AlbumsPage />
            </Route>
            <Route path="/myplaylists">
              <MyPlaylistsPage />
            </Route>
            <Route exact path="/playlists/:playlistId">
              <OnePlaylistPage />
            </Route>
            <Route path="/add-playlist-song/:playlistId">
              <AddPlaylistSong />
            </Route>
            <Route exact path="/playlists">
              <PlaylistsPage />
            </Route>
            <Route path="/">
              <SongsPage />
            </Route>
          </Switch>
        )}
        {/* <div
          style={{
            position: "fixed",
            bottom: 0,
            left: "50%",
            transform: "translate(10%, 0)",
            zIndex: 1000,
          }}
        >
          {isLoaded && (
            <AudioPlayer isLoaded={isLoaded} />
          )}
        </div> */}
      </div>
    </div>
  );
}

export default App;
