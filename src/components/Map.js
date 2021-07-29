import React, { useState } from 'react';
import styled from 'styled-components';
import MapGL from 'react-map-gl';
import Flag from './Flag';
import schoolData from '../data/schoolData.json';
import 'mapbox-gl/dist/mapbox-gl.css';

function Map() {
  const [viewport, setViewport] = useState({
    latitude: 38.21499,
    longitude: -76.534533,
    zoom: 10.62,
    bearing: 10.18,
    pitch: 56.05,
  });

  const flags = React.useMemo(
    () =>
      schoolData.map((school) => (
        <Flag
          lat={school.lat}
          long={school.long}
          aqi={40}
          schoolCode={school.id}
        />
      )),
    [schoolData]
  );

  return (
    <Container>
      <MapGL
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/ethanprintz/ckr59in1c17s017o7ep66ebi0"
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
      >
        {flags}
      </MapGL>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

export default Map;
