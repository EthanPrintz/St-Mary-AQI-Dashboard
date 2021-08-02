import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import LeftCol from './components/LeftCol';
import RightModal from './components/RightModal';
import Map from './components/Map';
import BarChart from './components/BarChart';
import SensorCurrentDisplay from './components/SensorCurrentDisplay';
// import CSVModal from './components/CSVModal';
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
          (liveSensor) => liveSensor.ID === schoolSensor.id
        );
        schoolSensor.liveAQI = sensor.AQI;
        schoolSensor.livePM25 = sensor.pm2_5_current;
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
    // Setstate using combined datasets
    setCombinedData(schoolData);

    document.getElementById('date-selector-button-0').classList.add('selected');
    document
      .getElementById('graph-selector-button-0')
      .classList.add('selected');
    document
      .getElementById('graph-selector-button-1')
      .classList.add('selected');
    document
      .getElementById('graph-selector-button-2')
      .classList.add('selected');
  }, []);

  useEffect(
    (selectedSchoolID) => {
      alert('School ID changed to', selectedSchoolID);
    },
    [selectedSchoolID]
  );

  const [data, setData] = useState([
    50, 70, 20, 90, 70, 30, 80, 40, 20, 50, 30, 90, 20, 10, 20, 25, 30, 25,
  ]);

  const [graphs, setGraphs] = useState([true, true, true, false]);

  let graphdimensions = [
    window.screen.width * 0.24,
    window.screen.width * 0.07,
    window.screen.width * 0.01,
  ];
  let sensordimensions = [
    window.screen.width * 0.24,
    window.screen.width * 0.12,
    window.screen.width * 0.01,
  ];

  let date_range = ['24 hours', '3 days', '1 week', '2 weeks'];

  let graph_names = ['PM 2.5', 'PM 10', 'Temperature', 'Humidity'];

  function updateDateRange(index) {
    for (let i = 0; i < 4; i++) {
      if (index == i) {
        document
          .getElementById('date-selector-button-' + i)
          .classList.add('selected');
      } else {
        document
          .getElementById('date-selector-button-' + i)
          .classList.remove('selected');
      }
    }
    if (index == 0) {
      setData([50, 70, 20, 90, 70, 30, 80, 40, 20, 50, 30, 90, 20, 10]);
    }
    if (index == 1) {
      setData([70, 20, 90, 70, 30, 80, 40, 20, 50, 30, 90, 20, 10, 50]);
    }
    if (index == 2) {
      setData([20, 90, 70, 30, 80, 40, 20, 50, 30, 90, 20, 10, 50, 80]);
    }
    if (index == 3) {
      setData([90, 70, 30, 80, 40, 20, 50, 30, 90, 20, 10, 50, 80, 20]);
    }
  }

  function updateGraphSelection(index) {
    if (graphs[index]) {
      document
        .getElementById('graph-selector-button-' + index)
        .classList.remove('selected');
    } else {
      document
        .getElementById('graph-selector-button-' + index)
        .classList.add('selected');
    }
    let temp = [...graphs];
    temp[index] = !temp[index];
    setGraphs(temp);
  }

  return (
    <AppContainer>
      <LeftCol
        combinedData={combinedData}
        setSelectedSchoolID={setSelectedSchoolID}
      />
      <Map
        combinedData={combinedData}
        setSelectedSchoolID={setSelectedSchoolID}
      />
      <RightModal>
        <SensorCurrentDisplay
          dimensions={sensordimensions}
          backleft={52}
          front={47}
          backright={47}
        />
        See Data For:{' '}
        {date_range.map((date, i) => (
          <button
            className="selector-button"
            id={'date-selector-button-' + i}
            key={i}
            onClick={() => updateDateRange(i)}
          >
            {' '}
            {date}{' '}
          </button>
        ))}
        <br />
        Toggle Data:{' '}
        {graph_names.map((graph_name, i) => (
          <button
            className={'selector-button'}
            id={'graph-selector-button-' + i}
            key={i}
            onClick={() => updateGraphSelection(i)}
          >
            {' '}
            {graph_name}{' '}
          </button>
        ))}
        {graphs[0] && (
          <BarChart
            data={data}
            dimensions={graphdimensions}
            desc={graph_names[0]}
          />
        )}
        {graphs[1] && (
          <BarChart
            data={data}
            dimensions={graphdimensions}
            desc={graph_names[1]}
          />
        )}
        {graphs[2] && (
          <BarChart
            data={data}
            dimensions={graphdimensions}
            gray
            desc={graph_names[2]}
          />
        )}
        {graphs[3] && (
          <BarChart
            data={data}
            dimensions={graphdimensions}
            gray
            desc={graph_names[3]}
          />
        )}
      </RightModal>
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
