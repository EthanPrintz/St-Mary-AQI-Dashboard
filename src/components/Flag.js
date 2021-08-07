import React from 'react';
import styled from 'styled-components';
import { Marker } from 'react-map-gl';
import { convertRemToPixels, convertAQIToColor } from '../utils/conversions';

function Flag({ lat, long, aqi, schoolCode, setSelectedSchoolID }) {
  let color = convertAQIToColor(aqi);
  return (
    <FlagMarker
      latitude={lat}
      longitude={long}
      id={`marker-${schoolCode}`}
      pitchAlignment="map"
      className="flag"
      offsetLeft={-1 * convertRemToPixels(1)}
      offsetTop={-1 * convertRemToPixels(2.2)}
      onClick={() => setSelectedSchoolID(schoolCode)}
    >
      <svg
        viewBox="0 0 1248 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M448.83 1026.23C678.846 1026.23 865.31 981.561 865.31 926.46C865.31 871.359 678.846 826.69 448.83 826.69C218.814 826.69 32.35 871.359 32.35 926.46C32.35 981.561 218.814 1026.23 448.83 1026.23Z"
          fill="url(#paint0_radial)"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M411.84 32.93H486.3V911.2C486.3 951.9 337.38 951.9 337.38 911.2V107.4C337.365 97.6172 339.281 87.9278 343.018 78.8867C346.755 69.8457 352.239 61.6309 359.156 54.713C366.073 47.7951 374.287 42.31 383.327 38.5721C392.368 34.8341 402.057 32.9168 411.84 32.93V32.93Z"
          fill="#D7D6D6"
        />
        <path
          fill={color}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1121.2 34.4201C1148.5 34.4201 1170.34 56.2701 1170.34 84.0601C1169.9 96.1345 1165.35 107.696 1157.44 116.83L1008.52 282.13L1156.94 447.43C1165.59 457.291 1170.01 470.155 1169.27 483.249C1168.52 496.343 1162.65 508.618 1152.94 517.43C1143.65 525.339 1131.88 529.735 1119.68 529.85H486.3V32.9301L1121.2 34.4201Z"
        />
        <defs>
          <radialGradient
            id="paint0_radial"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(452.14 923.038) scale(420.62 88.3302)"
          >
            <stop stopColor="#231F20" stopOpacity="0.175" />
            <stop offset="1" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </FlagMarker>
  );
}

const FlagMarker = styled(Marker)`
  width: 3rem;
  height: 3rem;
`;

export default Flag;
