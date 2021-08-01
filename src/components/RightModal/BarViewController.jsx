import React, { useState, useEffect } from "react";
import HParamSelector from "./HParamSelector";

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
    </>
  );
}

export default BarViewController;
