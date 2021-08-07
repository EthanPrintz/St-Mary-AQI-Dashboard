import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import LeftCol from './components/LeftCol';
import RightModal from './components/RightModal';
import Map from './components/Map';
import { getLiveSensorData } from './utils/getSensorData';
import schoolDataJSON from './data/schoolData.json';
import './App.css';

function App() {
  const [combinedData, setCombinedData] = useState([]);
  const [selectedSchoolID, setSelectedSchoolID] = useState(0);

  useEffect(async () => {
    // Get data from all sources
    const sensorData = await getLiveSensorData();
    const schoolData = schoolDataJSON;
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
  }, []);

  return (
    <AppContainer>
      <LeftCol
        combinedData={combinedData}
        setSelectedSchoolID={setSelectedSchoolID}
        selectedSchoolID={selectedSchoolID}
      />
      <Map
        combinedData={combinedData}
        setSelectedSchoolID={setSelectedSchoolID}
        selectedSchoolID={selectedSchoolID}
      />
      {selectedSchoolID !== 0 && (
        <RightModal
          combinedData={combinedData}
          selectedSchoolID={selectedSchoolID}
        />
      )}
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
