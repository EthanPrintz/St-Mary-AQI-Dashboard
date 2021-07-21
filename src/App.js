import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LeftCol from './components/LeftCol';
import { getSensorDataByURL } from './utils/getSensorData';
import './App.css';

function App() {
  useEffect(() => {
    getSensorDataByURL(
      'https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/measurements?format=csv&limit=66536&location=224746&date_from=2021-04-17T07%3A00%3A00.000Z&date_to=2021-05-01T07%3A00%3A00.000Z&parameter=130&parameter=2'
    );
  }, []);

  return (
    <AppContainer>
      <LeftCol />
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
