import React, { useState } from 'react';
import styled from 'styled-components';
import MapGL from 'react-map-gl';
import Flag from './Flag';
import 'mapbox-gl/dist/mapbox-gl.css';

function Map({ combinedData, setSelectedSchoolID, selectedSchoolID, mapType }) {
  const [viewport, setViewport] = useState({
    latitude: 38.21499,
    longitude: -76.534533,
    zoom: 10.62,
    bearing: 10.18,
    pitch: 56.05,
  });

  const mapStyles = [
    {
      name: 'classic',
      uri: 'mapbox://styles/ethanprintz/ckr59in1c17s017o7ep66ebi0',
    },
    {
      name: 'satellite',
      uri: 'mapbox://styles/ethanprintz/ckr6eno400vlt17pohba9l6af',
    },
  ];

  const flags = React.useMemo(
    () =>
      combinedData.map((school, i) => {
        return (
          <Flag
            key={i}
            lat={school.lat}
            long={school.long}
            aqi={school.liveAQI}
            schoolCode={school.id}
            setSelectedSchoolID={setSelectedSchoolID}
            selectedSchoolID={selectedSchoolID}
          />
        );
      }),
    [combinedData, selectedSchoolID, setSelectedSchoolID]
  );

  return (
    <Container>
      <MapGL
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle={mapStyles.find((style) => style.name === mapType)?.uri}
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
        ayncRender={true}
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
