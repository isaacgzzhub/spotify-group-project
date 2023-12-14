#  <img src="./react-app/public/favicon.ico" style="width:40px;" />   &nbsp; Cool Music Player

<br>

## Cool Music Player: Table of Contents

-   [Link to Live Site](https://github.com/issacgzzhub/spotify-group-project#link-to-live-site)
-   [Description](https://github.comissacgzzhub/spotify-group-project#description)
-   [Getting Started](https://github.com/issacgzzhub/spotify-group-project#getting-started)
-   [Technologies](https://github.com/issacgzzhub/spotify-group-project#technologies)
-   [Features](https://github.com/issacgzzhub/spotify-group-project#features)
-   [Screenshots](https://github.com/issacgzzhub/spotify-group-project#screenshots)

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
  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///9G47c84rQt4bGY7dKQ7NCi79ju/fg44rP3/vz6/v3p/PbC9OSI685Q5Lp76cjO9+q88+LZ+O596sqr8NpY5b0E36vL9ujT9+zj+vOy8t5o58KV7dG/9OSc7tV86slv6MPXNy61AAADXUlEQVR4nO3d2XaqMBhA4RqnaNUKijhU6vs/ZU9vzlqxPyohI93fdcTsImjUytsbAAAAAAAAAAAAkJ55uS3O+9mrmtK49VUctDTGNNKQVYi2xXG/q/Q/qoPx1djGTrqxNgvH0pC197xydvlJG3WlzT/+WtqCuiuUhkz95p2aje4el0/h6mKbl0dhsdHWeTkUFqNefckXHquefYkXLr6k+xpQYW3x3JBV4dTBDky5cF652IEJF5aO+pItrHufQhMvLNwcgukWnh0GJlnocg8mWVg7DUywsHR3kkmzcO7saSLVwspxYHKF01d2oVL6dePCuIPdWGIWHqQhjt6neX6WUVpdpue6PL2/auFmam4snu1Brdd1UjPuavewUOlbHXuGPR0fPkb11yn2BHvbPNqBVfl8A6k7P3iu103s2bnQfhAqdYw9ORfad6Gqsj5//td6FKrL8vmtM9C6rFeX2FNz5NZyGKrNMPbg23vrLpzHnpojs5ZdqAdxFv3RsmrSs9gTc+XU8iCtYkxGbX4bffbc6F5+kOooL9W8rIAv8lnmw8mMu/JRuGzZhXFWEz4Kj+JhGGkXeimUD0O9dTPjrnwUyot75WbCnfkoFJ8N1cTNhDvzUSgehtFezngonMsnmlirQg+F8mcV0VZNHgrFtaHq+zrJmofCQvwwoXh+Qz88FIpPh/HWTcEKo70B7KFQXP7qaIt7Ci1QGBiFFlIrlP4bYVCFtw/BvtcmEyv0gML8UZg/CvNHYf4ozB+F+UussN4K+r0vlljhQfoydb9vQSdW+AfW+BR2R2FgFFqgMDAKLVAYGIUWKAyMQgsUBkahBQoDG/77NMXqt2u/b9klVugBhfmjMH8U5o/C/FGYPwrzl1jhbi0499pkYoXD/5738Nf4FFqgMDAKLVAYGIUWKAyMQgsUBkahBQoDo9CCWDgeVKF0yb6Ihe7fp1kuJI7m2504m4H8TiwAAAAwaI10kayDOUZLY8wfcd1KF9s6JHHNLnkFbI4RL2FyM4aIvwqexnXXKKSQQgoppJBCCimkkEIKKaSQwmEUNuKn3OaYkfTR812h9PH0+GoWSnd1XyjdVb/3aVafk9/u/miNMGRi/hT8aSoM+TQvMFhIdzUxC8XNRLvqDQAAAAAAAAAAAP6abwmkVTxMuFMsAAAAAElFTkSuQmCC" style="width:75px;" />
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

## Screenshots

<img src="./react-app/public/images/<image_name_here>" style="width:600px;" />
