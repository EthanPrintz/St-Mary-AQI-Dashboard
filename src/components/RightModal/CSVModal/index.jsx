import React, { useEffect, useState } from "react";
import PropTypes, { number } from "prop-types";
import "./style.scss";
import ParamSelector from "../ParamSelector";
import TimespanSelector from "../ParamSelector/TimespanSelector";
import DividerSVG from "../ParamSelector/DividerSVG";
import { getAverage, createDataPointObj } from "./getAverage";
import axios from "axios";

const TODAY = new Date();
function CSVModal(props) {
  const [downloading, setDownloading] = useState(false);
  const [sensorOptions, setSensorOptions] = useState([
    // 224756, 225046 works
    { value: "225029", checked: false },
    { value: "224756", checked: false },
    { value: "225046", checked: false },
    { value: "beep2", checked: false },
    { value: "beep3", checked: false },
    { value: "beep4", checked: false },
  ]);

  const [airFactors, setAirFactors] = useState([
    { value: "PM 2.5", checked: false },
    { value: "PM 10", checked: false },
    //{ value: "Temperature", checked: false },
    //{ value: "Humidity", checked: false },
  ]);

  const [intervals, setIntervals] = useState([
    { value: "1 Hour", checked: true },
    { value: "3 Hours", checked: false },
    { value: "6 Hours", checked: false },
    { value: "24 Hours", checked: false },
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
  }, [sensorOptions, airFactors, ableToGetCSV]);

  async function submitAPICalls(queries, selectedAirFactors) {
    const sensorAverages = [];
    // follows the format:
    // {
    //   sensorName (key, String) : {
    //     sensorId: integer
    //     averagedDataIn_UG_M3: [
    //       {
    //         time: String,
    //         reading: number
    //       }
    //     ]
    //   }
    // }

    await axios.all(queries.map((query) => axios.get(query))).then(
      axios.spread((...responses) => {
        responses.forEach((response) => {
          const results = response.data.results;
          if (results) {
            const sensorName = results[0].location;
            const sensorId = results[0].locationId;
            const parameter = results[0].parameter;
            const splitAirFactorData = {};
            selectedAirFactors.forEach((airFactor) => {
              splitAirFactorData[airFactor] = results
                .filter(
                  (dataObject) =>
                    dataObject.unit === "µg/m³" &&
                    dataObject.parameter === airFactor
                )
                .map((dataObject) =>
                  createDataPointObj(dataObject.date.utc, dataObject.value)
                );
            });

            const selectedInterval = intervals.find(
              (item) => item.checked
            ).value;
            const IntervalInHours = parseInt(selectedInterval.split(" ")[0]);
            selectedAirFactors.forEach((airFactor) => {
              sensorAverages.push({
                sensorName,
                sensorId,
                parameter,
                averagedDataIn_ug_m3: getAverage(
                  splitAirFactorData[airFactor],
                  IntervalInHours
                ),
              });
            });
          }
        });
      })
    );
    return sensorAverages;
  }

  // follwing the format of { sensorName, sensorId, parameter, averagedDataIn_ug_m3 }
  function exportAsCSV(dataArray) {
    console.log(dataArray);
    const header = "locationId,location,parameter,time,value in µg/m³";
    const dataRows = [];
    dataArray.forEach((sensorData) => {
      const { sensorName, sensorId, parameter, averagedDataIn_ug_m3 } =
        sensorData;
      averagedDataIn_ug_m3.forEach((averagedDataPoint) => {
        dataRows.push(
          `${sensorName},${sensorId},${parameter},${new Date(
            averagedDataPoint.time
          ).toString()},${averagedDataPoint.reading}`
        );
      });
    });

    const csvDocument = [header, ...dataRows].join("\n");
    const file = new Blob([csvDocument], { type: "csv" });

    const link = document.createElement("a");
    link.setAttribute("href", URL.createObjectURL(file));
    link.setAttribute("download", "airquality.csv");
    document.body.appendChild(link); // Required for FF
    link.click();
  }

  function handleSubmission(e) {
    setDownloading(true);
    e.preventDefault();
    const BASE_URL =
      "https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/measurements?format=json&sort=asc&limit=100000&";

    const queries = [];
    const selectedSensors = sensorOptions
      .filter((item) => item.checked)
      .map((item) => item.value);
    const selectedFirstDate = JSON.stringify(firstDate).replaceAll('"', "");
    const selectedLastDate = JSON.stringify(lastDate).replaceAll('"', "");

    // remove whitespace and make lowercase, remove . from 2.5
    const selectedAirFactors = airFactors
      .filter((item) => item.checked)
      .map((item) =>
        item.value.toLowerCase().replaceAll(" ", "").replaceAll(".", "")
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

    submitAPICalls(queries, selectedAirFactors).then((sensorAverages) => {
      exportAsCSV(sensorAverages);
      setDownloading(false);
    });
    // console.log(exportAsCSV(sensorAverages));
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
            className={`export-csv${ableToGetCSV ? "" : " disabled"}${downloading ? " downloading" : ""}`}
            type="submit"
            onClick={handleSubmission}
            disabled={downloading || !ableToGetCSV}
          >
            {downloading ? "Downloading..." : "Export as CSV"}
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
