import React, { useState, useEffect } from "react";
import BarChart from "./BarChart";
import HParamSelector from "./HParamSelector";

let GRAPH_DIMENSIONS = [
  window.screen.width * 0.24,
  window.screen.width * 0.07,
  window.screen.width * 0.01,
];

function BarViewController() {
  const [timespanState, setTimespanState] = useState([
    { value: "24 Hours", checked: false },
    { value: "3 Days", checked: false },
    { value: "1 Week", checked: false },
    { value: "2 Weeks", checked: false },
  ]);

  const [airFactors, setAirFactors] = useState([
    { value: "PM 2.5", checked: false },
    { value: "PM 10", checked: false },
    { value: "Temperature", checked: false },
    { value: "Humidity", checked: false },
  ]);

  const [displayedDataSets, setDisplayedDatasets] = useState({
    mode: "24 Hours",
    graphs: {
      "PM 2.5": {
        data: [50, 70, 20, 90, 70, 30, 80, 40, 20, 50, 30, 90, 20, 10],
      },
      "PM 10": {
        data: [50, 70, 20, 90, 70, 30, 80, 40, 20, 50, 30, 90, 20, 10],
      },
      Temperature: {
        data: [50, 70, 20, 90, 70, 30, 80, 40, 20, 50, 30, 90, 20, 10],
      },
      Humidity: {
        data: [50, 70, 20, 90, 70, 30, 80, 40, 20, 50, 30, 90, 20, 10],
      },
    },
  });

  function renderGraphs() {
    const barChartComponents = [];
    airFactors.forEach((airFactor) => {
      if (airFactor.checked) {
        console.log(airFactor.value)
        barChartComponents.push(
          <BarChart
            className="hidden"
            data={displayedDataSets.graphs[airFactor.value].data}
            dimensions={GRAPH_DIMENSIONS}
            desc={airFactor.value}
            gray={["Temperature", "Humidity"].includes(airFactor.value)}
          />
        );
      }
    });
    return barChartComponents;
  }

  return (
    <>
      <HParamSelector
        queryParamType={"Data for Past"}
        dataState={timespanState}
        setDataState={setTimespanState}
        allowMultiple={false}
      />
      <HParamSelector
        queryParamType={"Air Factors"}
        dataState={airFactors}
        setDataState={setAirFactors}
        allowMultiple
      />
      <div className="bar-container">{renderGraphs()}</div>
    </>
  );
}

export default BarViewController;
