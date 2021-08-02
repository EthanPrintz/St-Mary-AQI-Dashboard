import React from "react";
import BarViewController from "./BarViewController";
import CurrentSensorDisplay from "./CurrentSensorDisplay";
import "./style.scss"

function DataViewer() {
  let sensorDimensions = [
    window.screen.width * 0.24,
    window.screen.width * 0.12,
    window.screen.width * 0.01,
  ];

  return (
    <div className="body-content">
      <CurrentSensorDisplay
        dimensions={sensorDimensions}
        backleft={52}
        front={47}
        backright={47}
      />
      <BarViewController />
    </div>
  );
}

export default DataViewer;
