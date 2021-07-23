import React from 'react';
import { Marker } from 'react-map-gl';

function Flag(lat, long, markerColor, schoolCode) {
  return (
    <Marker latitude={lat} longitude={long} id={`marker-${schoolCode}`}>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g fill-rule="evenodd" fill="none">
          <path d="M0 0h24v24H0Z" />
          <g fill="#000">
            <path d="M3.5 3H5v16.5c0 .82-.68 1.5-1.5 1.5v0c-.83 0-1.5-.68-1.5-1.5v-15C2 3.67 2.67 3 3.5 3Z" />
            <path
              fill={markerColor}
              d="M6.99 2.99l12.75 0c.55 0 .99.44.99 1 -.01.24-.1.48-.26.66l-3 3.33 2.99 3.33c.36.41.33 1.04-.08 1.41 -.19.16-.43.25-.67.25H6.95V2.96Z"
            />
          </g>
        </g>
      </svg>
    </Marker>
  );
}

export default Flag;
