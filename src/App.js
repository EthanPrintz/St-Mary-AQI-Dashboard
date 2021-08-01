import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LeftCol from './components/LeftCol';
import Map from './components/Map';
import BarChart from './components/BarChart';
import CSVModal from './components/CSVModal'
import { getSensorDataByURL } from './utils/getSensorData';
import './App.css';

function App() {
  useEffect(() => {
    const data = getSensorDataByURL(
      'https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/measurements?format=csv&limit=66536&location=224746&date_from=2021-04-17T07%3A00%3A00.000Z&date_to=2021-05-01T07%3A00%3A00.000Z&parameter=130&parameter=2'
    );
    console.log(data)
  }, []);

  let data = [50, 70, 20, 90, 70, 30, 80, 40, 20, 50, 30, 90, 20, 10];
  let dimensions = [300, 200, 50];

  return (
    <AppContainer>
      {/* <BarChart data={data} dimensions={dimensions} desc="PM 2.5" />
      <BarChart data={data} dimensions={dimensions} desc="PM 10" />
      <BarChart data={data} dimensions={dimensions} gray desc="Temperature" /> */}
      <LeftCol />
      <Map />
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
