import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import type Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';

interface Props {
  onReady?: (player: Player) => void;
}

const VideoPlayer: React.FC<Props> = ({ onReady }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (videoRef.current && !playerRef.current) {
      const options: any = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
          {
            src: 'https://s3.ap-south-1.amazonaws.com/hls-streaming-final-files-by-omsharma.dev/outputs/index.m3u8',
            type: 'application/x-mpegURL',
          },
        ],
      };

      playerRef.current = videojs(videoRef.current, options, function () {
        onReady?.(this);
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [onReady]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-default-skin vjs-big-play-centered" />
    </div>
  );
};

export default VideoPlayer;
