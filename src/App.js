import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import { readString } from 'react-papaparse'
// import 

const parameterTypes = [ "um025", "pm25" ];
const sensors = []

function getSensorDataByURL(url){
  const response = fetch(url)
  .then(response => response.text())
  .then(csv => readString(csv))
  .catch(err => console.log(err))
  
  response.then(arr => {      
    // locationId, location, city, coutnry, utc, local, parameter, value, unit, latitutde, longitude
    // 0         , 1       , 2   , 3      , 4  , 5    , 6        , 7    , 8   , 9        , 10
    const sensorData = arr.data.slice(1)
    let readings = [];
    const data = sensorData.slice(1)
    // parameterTypes.forEach((parameter) => {
    // readings.push({parameter, data: data.filter(dataEntry => dataEntry[6] === parameter).map(data => [data[4], data[7]])})
    readings.push({
      // utc: data,
      // um025: ,
      // pm25: 
    })
    // })

    const returnData = {
      locationId: sensorData[1][0],
      locationString: sensorData[1][1],
      latitude: sensorData[1][9],
      longitutde: sensorData[1][10],
      readings
    }

    console.log('Sensor Data:',returnData)
    return returnData;
  });
}

function App() {

  useEffect(() => {   
    getSensorDataByURL('https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/measurements?format=csv&limit=66536&location=224746&date_from=2021-04-17T07%3A00%3A00.000Z&date_to=2021-05-01T07%3A00%3A00.000Z&parameter=130&parameter=2')
  })

  /*
    {
      locationid: int
      locationString: string
      lat: float
      long: float
      readings: [
        {
          utc: Date,
          pm25: float
          um025: float
        }
      ]
    }
   */

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
