import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllAlbumsThunk } from "../../store/albums";

function AlbumsPage() {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getAllAlbumsThunk());
  }, [dispatch]);

  const albumsObj = useSelector((state) => state.albums);
  const albums = Object.values(albumsObj)
  console.log(albums)

  return (
    <div id='albums-page'>
      <h1>Albums</h1>
      <div className='album-tile-list'>

        {
          albums.map(album => (
            <NavLink key={album.id} className='album-tile' to={`/albums/${album.id}`}>
              <img className='album-img' src={`${album.thumbnail_url}`} alt='album-cover' title={`${album.album_name}`}/>
              <a>{`${album.album_name}`}</a>
            </NavLink>
          ))
        }

      </div>




    </div>
  );
}

export default AlbumsPage;
