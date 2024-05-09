import React from 'react';
import ReactPlayer from 'react-player';

const SoundPlayer = ({
  url,
  playing,
  onPlayPause,
}: {
  url: string;
  playing: any;
  onPlayPause: any;
}) => {
  return (
    <ReactPlayer
      url={url}
      playing={playing}
      controls
      width="100%"
      height="75px"
      onPlay={() => onPlayPause(true)}
      onPause={() => onPlayPause(false)}
    />
  );
};

export default SoundPlayer;
