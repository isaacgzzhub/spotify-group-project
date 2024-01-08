#  <img src="./react-app/public/favicon.ico" style="width:40px;" />   &nbsp; Cool Music Player

<br>

## Cool Music Player: Table of Contents

-   [Link to Live Site](https://github.com/isaacgzzhub/spotify-group-project#link-to-live-site)
-   [Description](https://github.com/isaacgzzhub/spotify-group-project#description)
-   [Getting Started](https://github.com/isaacgzzhub/spotify-group-project#getting-started)
-   [Technologies](https://github.com/isaacgzzhub/spotify-group-project#technologies)
-   [Features](https://github.com/isaacgzzhub/spotify-group-project#features)
-   [Screenshots](https://github.com/isaacgzzhub/spotify-group-project#screenshots)

<br>

## Link to Live Site

[Cool Music Player Live Site](https://cool-music-player-group-project.onrender.com)

<br>

## Description

Cool Music Player, based on Spotify, is a fullstack CRUD app implemented with a PFRN stack. This app allows users to upload and listen to songs, as well as delete and edit songs they own. Users can also organize songs into albums and playlists.

<br>

## Getting Started

1. Clone this repository

   ```bash
   git clone https://github.com/isaacgzzhub/spotify-group-project.git
   ```

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the .env.example file with credentials of your choice.

4. Setup your PostgreSQL user, password and database to match your chosen credentials in the .env file.

5. Enter your shell environment, upgrade and seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App, go inside the `react-app` directory, `npm install` and `npm start`. This should open your browser automatically but if not, you may navigate to `localhost:5000` to access the application.

<br>
<br>

## Technologies


<br>
<p float="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" style="width:75px;" />
  &nbsp;
  <img src="https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_477db83f729d63210139ec7cd29c1351/render-render.png" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original-wordmark.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original-wordmark.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original-wordmark.svg" style="width:75px;" />
  &nbsp;
</p>

<br>

## Features

Users
- Users can sign up, log in, and log out.
- Users can use a demo log in to try the site.
- Users can't use certain features without logging in (like creating and liking songs).

Songs
- Users should be able to view all Songs.
- Users should be able to upload songs.
- Users should be able to update their uploaded songs.
- Users should be able to delete their uploaded songs.

Albums
- Users should be able to view all albums created by users.
- Users should be able to add songs to an album they created.
- Users should be able to remove songs from their albums.
- Users should be able to delete their albums.

Likes
- Users should be able to view the likes on a song.
- Users should be able to like a song.
- Users should be able to unlike a song.

Playlists
- Users should be able to view all of their playlists.
- Users should be able to add a song to one of their playlists.
- Users should be able to remove a song from a playlist.

<br>

## About

Cool Music Player was created to serve three purposes:

1. Allow the user to retrieve/upload/edit/delete music.
2. Listen to songs on any page.
3. Create and share different albums and playlists with other people.

<br>

## Screenshots

<img src="./react-app/public/images/<image_name_here>" style="width:600px;" />
