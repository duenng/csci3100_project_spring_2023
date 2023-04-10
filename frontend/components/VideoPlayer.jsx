import "node_modules/video-react/dist/video-react.css"; // import css
import React from 'react';
import { Player, ControlBar ,PlayToggle,BigPlayButton} from 'video-react';

export default function VideoPlayer(props) {
  let route = "video/";
  return (
    <Player
      playsInline
      src={route + props.filename}>
        <ControlBar autoHide={false} className="my-class" />
        <BigPlayButton position="center" />
        <PlayToggle/>
      </Player>
  );
}
