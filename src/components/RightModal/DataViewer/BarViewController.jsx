import React, { useState, useEffect } from "react";
import BarChart from "./BarChart";
import ParamSelector from "../ParamSelector";
import axios from 'axios';

let GRAPH_DIMENSIONS = [
  window.screen.width * 0.24,
  window.screen.width * 0.07,
  window.screen.width * 0.01,
];

function reduceArr(arr, newsize){
  let newarr = []
  let currlength = arr.length
  let mult = currlength/newsize

  for(let i = 0; i < newsize; i++){
    let start = Math.round(mult*i)
    let end = Math.round(mult*(i+1))
    let avg = arr.slice(start, end).reduce((a,b) => a+b, 0) / (end - start)
    avg = avg.toFixed(1)
    newarr.push(avg)
  }
  return newarr
}

function BarViewController() {
  const [timespanState, setTimespanState] = useState([
    { value: "24 Hours", checked: true },
    { value: "3 Days", checked: false },
    { value: "1 Week", checked: false },
    { value: "2 Weeks", checked: false },
  ]);

  const [airFactors, setAirFactors] = useState([
    { value: "PM 2.5", checked: true },
    { value: "PM 10", checked: true },
    { value: "Temperature", checked: false },
    { value: "Humidity", checked: false },
  ]);

  const [displayedDataSets, setDisplayedDataSets] = useState({
    mode: "24 Hours",
    graphs: {
      "PM 2.5": {
        data: [],
      },
      "PM 10": {
        data: [],
      },
      Temperature: {
        data: [50, 70, 20, 90, 70, 30, 80, 40, 20, 50, 30, 90, 20, 10],
      },
      Humidity: {
        data: [50, 70, 20, 90, 70, 30, 80, 40, 20, 50, 30, 90, 20, 10],
      },
    },
  });
  
  const sensortypes = ["pm25", "pm10"]

  async function updateSensorData() {
    const BASE_URL =
      'https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/measurements?format=json&';

    const queries = [];
    const selectedSensors = ['224756'];
    const TODAY = new Date();
    let currTS = timespanState.filter((item) => item.checked)[0]
    let startdate = new Date();
    switch(currTS.value){
      case "24 Hours":
        startdate.setDate(startdate.getDate() - 1);
        break;
      case "3 Days":
        startdate.setDate(startdate.getDate() - 3);
        break;
      case "1 Week":
        startdate.setDate(startdate.getDate() - 7);
        break;
      case "2 Weeks":
        startdate.setDate(startdate.getDate() - 14);
        break;
	}
    const selectedFirstDate = JSON.stringify(startdate).replaceAll(
      '"',
      ''
    );
    const selectedLastDate = JSON.stringify(TODAY).replaceAll('"', '');
    const selectedAirFactors = sensortypes.map((item) =>
      item.toLowerCase().replace(/\s/g, '')
    );

    // need to get sensorID, not name
    selectedSensors.forEach((sensor) => {
      const parameters = [];
      parameters.push(`location=${sensor}`);
      selectedAirFactors.forEach((airFactor) => {
        parameters.push(`parameter=${airFactor}`);
      });
      parameters.push(`date_from=${selectedFirstDate}`);
      parameters.push(`date_to=${selectedLastDate}`);
      parameters.push(`limit=5000`);

      queries.push(`${BASE_URL}${parameters.join('&')}`);
    });

    console.log(queries);

    const response = axios.get(queries[0]);

    response.then((raw) => {
      let data = raw.data.results;

      //pm25
      let pm25 = data
        .filter((item) => item.parameter === 'pm25')
        .map((item) => item.value);
      //pm10
      let pm10 = data
        .filter((item) => item.parameter === 'pm10')
        .map((item) => item.value);

      pm25 = reduceArr(pm25, 20)
      pm10 = reduceArr(pm10, 20)
	
      let temp = JSON.parse(JSON.stringify(displayedDataSets));
      temp.graphs["PM 2.5"].data = pm25
      temp.graphs["PM 10"].data = pm10
      setDisplayedDataSets(temp)

    });
  }

  function renderGraphs() {
    const barChartComponents = [];
    airFactors.forEach((airFactor,i) => {
      if (airFactor.checked) {
        console.log(airFactor.value)
        barChartComponents.push(
          <BarChart
            className="hidden"
            data={displayedDataSets.graphs[airFactor.value].data}
            dimensions={GRAPH_DIMENSIONS}
            desc={airFactor.value}
            gray={["Temperature", "Humidity"].includes(airFactor.value)}
            key={"chart-"+i}
          />
        );
      }
    });
    return barChartComponents;
  }
  
  useEffect(() => {
    updateSensorData(); 
  },[]);

  return (
    <>
      <ParamSelector
        queryParamType={"Data for Past"}
        dataState={timespanState}
        setDataState={setTimespanState}
        allowMultiple={false}
        widget
        runFunction={updateSensorData}
      />
      <ParamSelector
        queryParamType={"Air Factors"}
        dataState={airFactors}
        setDataState={setAirFactors}
        allowMultiple
        widget
      />
      <div className="bar-container">{renderGraphs()}</div>
    </>
  );
}

export default BarViewController;
