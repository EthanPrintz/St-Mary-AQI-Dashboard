import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import './style.scss';
import { DISTRICT_MAPPING } from '../../utils/districtMapping';

function SelectionPill(props) {
  const {
    dataParameter, state, changeState, allowMultiple,
  } = props;

  function handleFetchChange(e) {
    const newState = [...state];
    const dataChecked = dataParameter.checked;
    if (!allowMultiple) { newState.forEach((data) => data.checked = false); }
    dataParameter.checked = !dataChecked;
    changeState(newState);
  }

  return (
    <div
      className={`selection-item${dataParameter.checked ? ' checked' : ''}`}
      onClick={handleFetchChange}
      onKeyPress={handleFetchChange}
      role="button"
      tabIndex={0}
    >
      <span>{dataParameter.value}</span>
    </div>
  );
}

function QuerySelector(props) {
  const { dataState, setDataState, queryParamType, allowMultiple } = props;

  return (
    <div className="selection-container pollutant">
      <div className="selection-title-container">
        <span className="selection-title">
          Select
          {' '}
          {queryParamType}
        </span>
      </div>
      <div className="horizontal-list-container">
        {
        dataState.map((type) => (
          <SelectionPill
            dataParameter={type}
            state={dataState}
            changeState={setDataState}
            allowMultiple={allowMultiple}
            index={0}
          />
        ))
      }
      </div>
    </div>
  );
}

function TimespanSelector() {
  const today = new Date();
  const farDate = new Date();
  farDate.setDate(today.getDate() - 1);
  const recentDate = today;

  const [firstDate, setFirstDate] = useState(farDate);
  const [lastDate, setLastDate] = useState(recentDate);

  const [timespans, setTimespan] = useState([
    { value: '1 Day', checked: true },
    { value: '1 Week', checked: false },
    { value: '1 Month', checked: false },
    { value: '6 Months', checked: false },
  ]);

  function CustomSelectionPill(props) {
    const { timespan } = props;

    function handleTimespanChange(e) {
      const newTimespan = [...timespans];
      newTimespan.forEach((data) => { data.checked = false; });
      timespan.checked = true;
      setTimespan(newTimespan);

      const currentDate = new Date();
      const firstDateOfInterval = new Date();
      switch (timespan.value) {
        case '1 Day':
          firstDateOfInterval.setDate(currentDate.getDate() - 1);
          break;
        case '1 Week':
          firstDateOfInterval.setDate(currentDate.getDate() - 7);
          break;
        case '1 Month':
          firstDateOfInterval.setMonth(currentDate.getMonth() - 1);
          break;
        case '6 Months':
          firstDateOfInterval.setMonth(currentDate.getMonth() - 6);
          break;
        default:
      }
      setFirstDate(firstDateOfInterval);
      setLastDate(currentDate);
    }

    return (
      <div
        className={`selection-item${timespan.checked ? ' checked' : ''}`}
        onClick={handleTimespanChange}
        onKeyPress={handleTimespanChange}
        role="button"
        tabIndex={0}
      >
        <span>{timespan.value}</span>
      </div>
    );
  }

  function setNoneChecked() {
    const newTimespan = [...timespans];
    newTimespan.forEach((data) => { data.checked = false; });
    setTimespan(newTimespan);
  }

  function getMaximumEarlyDate(){
    const maximumEarlyDate = new Date()
    maximumEarlyDate.setDate(lastDate.getDate() - 1);
    return maximumEarlyDate.toISOString().slice(0, 10)
  }
  return (
    <div className="selection-container pollutant">
      <div className="selection-title-container">
        <span className="selection-title">
          Select Timespan
        </span>
      </div>
      <div className="horizontal-list-container">
        {
          timespans.map((timespan) => (
            <CustomSelectionPill
              timespan={timespan}
            />
          ))
        }
      </div>
      <div className="horizontal-list-container dates">
        <input
          id="last-date"
          className="date-select"
          type="date"
          value={firstDate.toISOString().slice(0, 10)}
          max={getMaximumEarlyDate()}
          onChange={(e) => {
            setFirstDate(new Date(e.target.value));
            setNoneChecked();
          }}
        />
        <span> to </span>
        <input
          id="recent-date"
          className="date-select"
          type="date"
          value={lastDate.toISOString().slice(0, 10)}
          max={today.toISOString().slice(0, 10)}
          onChange={(e) => {
            const newDate = new Date(e.target.value);
            setLastDate(newDate);
            setNoneChecked();

            if (firstDate.getTime() > newDate.getTime()) {
              const yesterDate = new Date(newDate);
              yesterDate.setDate(newDate.getDate() - 1);
              setFirstDate(yesterDate);
              const newTimespan = [...timespans];
              newTimespan.forEach((timeType) => { timeType.checked = false; });
              newTimespan.find((timeType) => timeType.value === '1 Day').checked = true;
              setTimespan(newTimespan);
            }
          }}
        />
      </div>
    </div>
  );
}

function DividerSVG() {
  return (
    <svg width="10" height="25" viewBox="0 0 10 39" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 34L5 5" stroke="#EAEAEA" strokeWidth="9" strokeLinecap="square" />
    </svg>
  );
}
function CSVModal(props) {
  const { school } = props;

  const [sensorOptions, setSensorOptions] = useState([
    { value: '90817', checked: false },
    { value: 'beep2', checked: false },
    { value: 'beep3', checked: false },
    { value: 'beep4', checked: false },
    { value: 'beep5', checked: false },
    { value: 'beep5', checked: false },
    { value: 'beep5', checked: false },
    { value: 'beep5', checked: false },
    { value: 'beep5', checked: false },
  ]);

  const [airFactors, setAirFactors] = useState([
    { value: 'PM 2.5', checked: false },
    { value: 'PM 10', checked: false },
    { value: 'Temperature', checked: false },
    { value: 'Humidity', checked: false },
  ]);

  const [intervals, setIntervals] = useState([
    { value: 'Hour', checked: true },
    { value: '3 Hours', checked: false },
    { value: '6 Hours', checked: false },
    { value: 'Daily', checked: false },
  ]);

  // TODO: make scalable so that it's not just st.marys
  const schoolName = DISTRICT_MAPPING.stmarys.find((record) => record.abbreviation === school).name;

  function handleSubmission(e){
    e.preventDefault();
    const BASE_URL = "https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/measurements?format=csv";

    // need validation


    const queries = [];
    const selectedSensors = sensorOptions.filter(item => item.checked).map(item => item.value)
    const selectedAirFactors = airFactors.filter(item => item.checked).map(item => item.value.toLowerCase().replace(/\s/g, ""))
    const selectedInterval = intervals.find(item => item.checked)

    // need to get sensorID, not name
    selectedSensors.forEach((sensor)=>{
      const parameters = []
      parameters.push(`location=${sensor}`)
      selectedAirFactors.forEach((airFactor) => {
        parameters.push(`parameter=${airFactor}`)
      })
      
      queries.push(`${BASE_URL}${parameters.join('&')}`)
    })
    console.log(queries)
  }
  
  return (
    <div className="modal-container">
      <form>
        <div className="return-graph" />
        <div className="header">
          <span className="school-title">{schoolName}</span>
        </div>
        <div className="body-content">
          <QuerySelector
            queryParamType="Sensor(s)"
            dataState={sensorOptions}
            setDataState={setSensorOptions}
            allowMultiple
          />
          <DividerSVG />
          <QuerySelector
            queryParamType="Type(s)"
            dataState={airFactors}
            setDataState={setAirFactors}
            allowMultiple
          />
          <DividerSVG />
          <QuerySelector
            queryParamType="Interval"
            dataState={intervals}
            setDataState={setIntervals}
            allowMultiple={false}
          />
          <DividerSVG />
          <TimespanSelector />
          <DividerSVG />
          <button className="export-csv" type="submit" onClick={handleSubmission}>
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
