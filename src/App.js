import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './App.css';
import { readString } from 'react-papaparse';

function getSensorDataByURL(url) {
  const response = fetch(url)
    .then((response) => response.text())
    .then((csv) => readString(csv))
    .catch((err) => console.log(err));

  response.then((arr) => {
    // locationId, location, city, coutnry, utc, local, parameter, value, unit, latitutde, longitude
    // 0         , 1       , 2   , 3      , 4  , 5    , 6        , 7    , 8   , 9        , 10
    const sensorData = arr.data.slice(1);
    let readings = [];
    const data = sensorData.slice(1);
    data.forEach((reading) => {
      const utcTimestamp = reading[4];
      const readingType = reading[6];
      const readingValue = reading[7];

      if (readings.some((r) => r.utc === utcTimestamp)) {
        readings[readings.findIndex((r) => r.utc === utcTimestamp)][
          readingType
        ] = readingValue;
      } else {
        readings.push({
          utc: utcTimestamp,
          [readingType]: readingValue,
        });
      }
    });

    // })

    const returnData = {
      locationId: sensorData[1][0],
      locationString: sensorData[1][1],
      latitude: sensorData[1][9],
      longitutde: sensorData[1][10],
      readings,
    };

    console.log(returnData);
    return returnData;
  });
}

function App() {
  useEffect(() => {
    getSensorDataByURL(
      'https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/measurements?format=csv&limit=66536&location=224746&date_from=2021-04-17T07%3A00%3A00.000Z&date_to=2021-05-01T07%3A00%3A00.000Z&parameter=130&parameter=2'
    );
  }, []);

  return (
    <AppContainer>
      <LeftCol></LeftCol>
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

const LeftCol = styled.div`
  width: 20rem;
  height: 90vh;
  position: absolute;
  top: 5vh;
  left: 5vh;
  border-radius: 2rem;
  background-color: #f4f4f4;
`;

export default App;
