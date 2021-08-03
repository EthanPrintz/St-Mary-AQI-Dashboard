import React, { useEffect } from "react";
import BarViewController from "./BarViewController";
import CurrentSensorDisplay from "./CurrentSensorDisplay";
import "./style.scss"

function DataViewer(props) {
  let sensorDimensions = [
    window.screen.width * 0.24,
    window.screen.width * 0.12,
    window.screen.width * 0.01,
  ];

  return (
    <div className="body-content">
      <CurrentSensorDisplay
        dimensions={sensorDimensions}
        liveAQI={props.combinedData.length !== 0 ? props.combinedData[props.selectedSchoolID].liveAQI : "-"}
        liveSensors={props.combinedData.length !== 0 ? props.combinedData[props.selectedSchoolID].sensors : []}
      />
      <BarViewController />
    </div>
  );
}

export default DataViewer;
