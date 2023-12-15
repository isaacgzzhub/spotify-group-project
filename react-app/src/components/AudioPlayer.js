function AudioPlayer({ songUrl }) {
  return (
    <audio controls>
      <source src={songUrl} type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>
  );
}

export default AudioPlayer;
