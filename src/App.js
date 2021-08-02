import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LeftCol from "./components/LeftCol";
import RightModal from "./components/RightModal";
import Map from "./components/Map";
import BarChart from "./components/BarChart";
import SensorCurrentDisplay from "./components/SensorCurrentDisplay";
import CSVModal from "./components/CSVModal";
import { getSensorDataByURL } from "./utils/getSensorData";
import axios from "axios";
import "./App.css";

function App() {
  let date_range = ["24 hours", "3 days", "1 week", "2 weeks"];

  let graph_names = ["PM 25", "PM 10", "Temperature", "Humidity"];

  const [sensorAvg, getSensorAvg] = useState([0, 0, 0]);

  const [pm25data, setpm25Data] = useState([]);

  const [pm10data, setpm10Data] = useState([]);
  async function updateSensorData() {
    const BASE_URL =
      "https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/measurements?format=json&";

    const queries = [];
    const selectedSensors = ["224756"];
    const TODAY = new Date();
    const selectedFirstDate = JSON.stringify(TODAY.getDate() - 1).replaceAll(
      '"',
      ""
    );
    const selectedLastDate = JSON.stringify(TODAY).replaceAll('"', "");
    const selectedAirFactors = graph_names.map((item) =>
      item.toLowerCase().replace(/\s/g, "")
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

      queries.push(`${BASE_URL}${parameters.join("&")}`);
    });

    console.log(queries);

    const response = axios.get(queries[0]);

    response.then((raw) => {
      let data = raw.data.results;

      //pm25
      let pm25 = data
        .filter((item) => item.parameter === "pm25")
        .map((item) => 10 * item.value);
      //pm10
      let pm10 = data
        .filter((item) => item.parameter === "pm10")
        .map((item) => 10 * item.value);

      setpm25Data(pm25);
      setpm10Data(pm10);

      return [pm25, pm10];
    });
  }

  useEffect(() => {
    //console.log(getSensorDataByURL());

    document.getElementById("date-selector-button-0").classList.add("selected");
    document
      .getElementById("graph-selector-button-0")
      .classList.add("selected");
    document
      .getElementById("graph-selector-button-1")
      .classList.add("selected");
    document
      .getElementById("graph-selector-button-2")
      .classList.add("selected");
    //const data = getSensorDataByURL(
    //  'https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/measurements?format=csv&limit=66536&location=224746&date_from=2021-04-17T07%3A00%3A00.000Z&date_to=2021-05-01T07%3A00%3A00.000Z&parameter=130&parameter=2'
    //);
    updateSensorData();
  }, []);

  const [data, setData] = useState([
    50, 70, 20, 90, 70, 30, 80, 40, 20, 50, 30, 90, 20, 10,
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

  function updateDateRange(index) {
    for (let i = 0; i < 4; i++) {
      if (index === i) {
        document
          .getElementById("date-selector-button-" + i)
          .classList.add("selected");
      } else {
        document
          .getElementById("date-selector-button-" + i)
          .classList.remove("selected");
      }
    }
    if (index === 0) {
      setData([50, 70, 20, 90, 70, 30, 80, 40, 20, 50, 30, 90, 20, 10]);
    }
    if (index === 1) {
      setData([70, 20, 90, 70, 30, 80, 40, 20, 50, 30, 90, 20, 10, 50]);
    }
    if (index === 2) {
      setData([20, 90, 70, 30, 80, 40, 20, 50, 30, 90, 20, 10, 50, 80]);
    }
    if (index === 3) {
      setData([90, 70, 30, 80, 40, 20, 50, 30, 90, 20, 10, 50, 80, 20]);
    }
  }

  function updateGraphSelection(index) {
    if (graphs[index]) {
      document
        .getElementById("graph-selector-button-" + index)
        .classList.remove("selected");
    } else {
      document
        .getElementById("graph-selector-button-" + index)
        .classList.add("selected");
    }
    let temp = [...graphs];
    temp[index] = !temp[index];
    setGraphs(temp);
  }

  return (
    <AppContainer>
      {/*<LeftCol />*/}
      {/*<Map />*/}
      <RightModal>
        <SensorCurrentDisplay
          dimensions={sensordimensions}
          backleft={52}
          front={47}
          backright={47}
        />
        See Data For:{" "}
        {date_range.map((date, i) => (
          <button
            className="selector-button"
            id={"date-selector-button-" + i}
            key={i}
            onClick={() => updateDateRange(i)}
          >
            {" "}
            {date}{" "}
          </button>
        ))}
        <br />
        Toggle Data:{" "}
        {graph_names.map((graph_name, i) => (
          <button
            className={"selector-button"}
            id={"graph-selector-button-" + i}
            key={i}
            onClick={() => updateGraphSelection(i)}
          >
            {" "}
            {graph_name}{" "}
          </button>
        ))}
        {graphs[0] && (
          <BarChart
            data={pm25data}
            dimensions={graphdimensions}
            desc={graph_names[0]}
          />
        )}
        {graphs[1] && (
          <BarChart
            data={pm10data}
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
