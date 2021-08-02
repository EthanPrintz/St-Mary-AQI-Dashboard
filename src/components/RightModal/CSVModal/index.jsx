import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import ParamSelector from "../ParamSelector";
import TimespanSelector from "../ParamSelector/TimespanSelector";
import DividerSVG from "../ParamSelector/DividerSVG"
import axios from "axios";

const TODAY = new Date();
function CSVModal(props) {
  const [sensorOptions, setSensorOptions] = useState([
    { value: "225029", checked: false },
    { value: "beep2", checked: false },
    { value: "beep3", checked: false },
    { value: "beep4", checked: false },
  ]);

  const [airFactors, setAirFactors] = useState([
    { value: "PM 2.5", checked: false },
    { value: "PM 10", checked: false },
    { value: "Temperature", checked: false },
    { value: "Humidity", checked: false },
  ]);

  const [intervals, setIntervals] = useState([
    { value: "Hour", checked: true },
    { value: "3 Hours", checked: false },
    { value: "6 Hours", checked: false },
    { value: "Daily", checked: false },
  ]);

  const farDate = new Date();
  farDate.setDate(TODAY.getDate() - 1);
  const recentDate = TODAY;
  const [firstDate, setFirstDate] = useState(farDate);
  const [lastDate, setLastDate] = useState(recentDate);

  // validation for call to retrieve csv
  const [ableToGetCSV, setAbleToGetCSV] = useState(false);
  useEffect(() => {
    const schoolChosen = sensorOptions.some((sensor) => sensor.checked);
    const airFactorChosen = airFactors.some((airFactor) => airFactor.checked);

    setAbleToGetCSV(airFactorChosen && schoolChosen);
    console.log(ableToGetCSV);
  }, [sensorOptions, airFactors, ableToGetCSV]);

  async function handleSubmission(e) {
    e.preventDefault();
    const BASE_URL =
      "https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/measurements?format=csv&";

    const queries = [];
    const selectedSensors = sensorOptions
      .filter((item) => item.checked)
      .map((item) => item.value);
    const selectedFirstDate = JSON.stringify(firstDate).replaceAll('"', "");
    const selectedLastDate = JSON.stringify(lastDate).replaceAll('"', "");
    const selectedAirFactors = airFactors
      .filter((item) => item.checked)
      .map((item) => item.value.toLowerCase().replace(/\s/g, ""));
    const selectedInterval = intervals.find((item) => item.checked);

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

    const response = await axios.get(queries[0]);
    console.log(response);
  }

  return (
    <div className="modal-container">
      <form>
        <div className="body-content">
          <ParamSelector
            queryParamType="Sensor(s)"
            dataState={sensorOptions}
            setDataState={setSensorOptions}
            allowMultiple
            widget={false}
          />
          <DividerSVG />
          <ParamSelector
            queryParamType="Type(s)"
            dataState={airFactors}
            setDataState={setAirFactors}
            allowMultiple
            widget={false}
          />
          <DividerSVG />
          <ParamSelector
            queryParamType="Interval"
            dataState={intervals}
            setDataState={setIntervals}
            allowMultiple={false}
            widget={false}
          />
          <DividerSVG />
          <TimespanSelector
            firstDate={firstDate}
            setFirstDate={setFirstDate}
            lastDate={lastDate}
            setLastDate={setLastDate}
            today={TODAY}
            horizontal={false}
          />
          <DividerSVG />
          <button
            className={`export-csv ${ableToGetCSV ? "" : "disabled"}`}
            type="submit"
            onClick={handleSubmission}
            disabled={!ableToGetCSV}
          >
            Export as CSV
          </button>
        </div>
      </form>
    </div>
  );
}

CSVModal.propTypes = {
  school: PropTypes.string.isRequired,
};

export default CSVModal;