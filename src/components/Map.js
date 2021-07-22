import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import MapGL from 'react-map-gl';

function Map() {
  const [viewport, setViewport] = useState({
    latitude: 38.297894,
    longitude: -76.549982,
    zoom: 10.72,
    bearing: 20.8,
    pitch: 44.04,
  });
  console.log(process.env.MAPBOX_ACCESS_TOKEN);

  return (
    <Container>
      <MapGL
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/ethanprintz/ckr59in1c17s017o7ep66ebi0"
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
      />
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
