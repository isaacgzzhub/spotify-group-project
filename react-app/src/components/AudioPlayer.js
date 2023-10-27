function AudioPlayer() {
  return (
    <audio controls>
      <source src="/Rachmaninoff-2-piano-suite.mp3" type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>
  );
}

export default AudioPlayer;
