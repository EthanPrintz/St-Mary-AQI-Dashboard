import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import { readString } from 'react-papaparse'

function App() {

  useEffect(() => {   
    const response = fetch('https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/measurements?format=csv&limit=66536&location=224746&date_from=2021-04-17T07%3A00%3A00.000Z&date_to=2021-05-01T07%3A00%3A00.000Z&parameter=130&parameter=2 ')
   .then(response => response.text())
   .then(v => readString(v))
   .catch(err => console.log(err))

response.then(v => console.log(v))
  });
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
