import React from 'react';
import YouTube from 'react-youtube';

export default function VideoPlayer({url}) {
    const opts = {
      playerVars: {
        autoplay: 0,
      },
    };

    return <YouTube videoId={url} opts={opts} className='yt-player' />;
}
