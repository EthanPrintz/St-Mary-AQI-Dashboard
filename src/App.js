import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import LeftCol from './components/LeftCol';
import RightModal from './components/RightModal';
import MapControls from './components/MapControls/';
import Map from './components/Map';
import { getLiveSensorData, getCountyAQI } from './utils/getSensorData';
import schoolDataJSON from './data/schoolData.json';
import './App.css';

function App() {
  const [combinedData, setCombinedData] = useState([]);
  const [countyAQI, setCountyAQI] = useState(0);
  const [selectedSchoolID, setSelectedSchoolID] = useState(0);
  const [mapType, setMapType] = useState('classic'); //Can be classic or satellite

  useEffect(() => {
    let sensorData, schoolData;
    (async () => {
      // Get data from all sources
      sensorData = await getLiveSensorData();
      schoolData = schoolDataJSON;

      // Loop through schools to combine data into array  as single source of truth
      schoolData.forEach((school) => {
        // Construct array of sensor data for each school
        school.sensors.forEach((schoolSensor) => {
          let sensor = sensorData.find(
            (liveSensor) => liveSensor.ID === schoolSensor['purple-air-id']
          );
          try {
            schoolSensor.liveAQI = sensor.AQI;
            schoolSensor.livePM25 = sensor.pm2_5_current;
          } catch {
            schoolSensor.liveAQI = 0;
            schoolSensor.livePM25 = 0;
          }
        });
        // Get average PM 2.5 of all school's sensors
        school.livePM25 = Math.round(
          school.sensors.reduce((total, next) => total + next.livePM25, 0) /
            school.sensors.length
        );
        // Get average AQI of all school's sensors
        school.liveAQI = Math.round(
          school.sensors.reduce((total, next) => total + next.liveAQI, 0) /
            school.sensors.length
        );
      });
      setCombinedData(schoolData);
      setCountyAQI(Math.round(await getCountyAQI()));
    })().catch((err) => {
      console.error(err);
    });
  }, []);

  return (
    <AppContainer>
      <LeftCol
        combinedData={combinedData}
        countyAQI={countyAQI}
        setSelectedSchoolID={setSelectedSchoolID}
        selectedSchoolID={selectedSchoolID}
      />
      <Map
        combinedData={combinedData}
        setSelectedSchoolID={setSelectedSchoolID}
        selectedSchoolID={selectedSchoolID}
        mapType={mapType}
      />
      {selectedSchoolID !== 0 && (
        <RightModal
          combinedData={combinedData}
          selectedSchoolID={selectedSchoolID}
          setSelectedSchoolID={setSelectedSchoolID}
        />
      )}
      <MapControls setMapType={setMapType} mapType={mapType}></MapControls>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  background-color: grey;
`;
export default App;
