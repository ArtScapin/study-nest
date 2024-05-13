import React from 'react';
import YouTube from 'react-youtube';

export default function VideoPlayer({url}) {
    const opts = {
      height: '225',
      width: '400',
      playerVars: {
        autoplay: 0,
      },
    };

    return <YouTube videoId={url} opts={opts} />;
}
