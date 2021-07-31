import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import './style.scss';
import { DISTRICT_MAPPING } from '../../utils/districtMapping';

function SelectSensors() {
  const options = [
    { value: 'beep1', label: 'Beep1' },
    { value: 'beep2', label: 'Beep2' },
    { value: 'beep3', label: 'Beep3' },
    { value: 'beep4', label: 'Beep4' },
    { value: 'beep5', label: 'Beep5' },
  ];

  return (
    <div className="selection-container">
      <div className="selection-title-container">
        <span className="selection-title">Select Sensors</span>
      </div>
      <Select options={options} isMulti name="sensors" />
    </div>
  );
}

function SelectionPill(props) {
  const {
    dataParameter, state, setState, allowMultiple,
  } = props;

  function handleFetchChange(e) {
    const newState = [...state];
    if (!allowMultiple) { newState.forEach((data) => data.checked = false); }
    dataParameter.checked = true;
    setState(newState);
  }

  return (
    <div
      className={`selection-item${dataParameter.checked ? ' checked' : ''}`}
      onClick={handleFetchChange}
      onKeyPress={handleFetchChange}
      role="button"
      tabIndex={0}
    >
      <span>{dataParameter.type}</span>
    </div>
  );
}

function QuerySelector(props) {
  const { queryParamType, queryParams, allowMultiple } = props;
  const [dataTypes, setDataFetchStatus] = useState(queryParams);

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
        dataTypes.map((type) => (
          <SelectionPill
            dataParameter={type}
            state={dataTypes}
            changeState={setDataFetchStatus}
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
    { type: '1 Day', checked: true },
    { type: '1 Week', checked: false },
    { type: '1 Month', checked: false },
    { type: '6 Months', checked: false },
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
      switch (timespan.type) {
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
        <span>{timespan.type}</span>
      </div>
    );
  }

  function setNoneChecked() {
    const newTimespan = [...timespans];
    newTimespan.forEach((data) => { data.checked = false; });
    setTimespan(newTimespan);
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
          max={lastDate.toISOString().slice(0, 10)}
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
              newTimespan.find((timeType) => timeType.type === '1 Day').checked = true;
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

  const airFactors = [
    { type: 'PM 2.5', checked: false },
    { type: 'PM 10', checked: false },
    { type: 'Temperature', checked: false },
    { type: 'Humidity', checked: false },
  ];

  const intervals = [
    { type: 'Hour', checked: true },
    { type: '3 Hours', checked: false },
    { type: '6 Hours', checked: false },
    { type: 'Daily', checked: false },
  ];

  // TODO: make scalable so that it's not just st.marys
  const schoolName = DISTRICT_MAPPING.stmarys.find((record) => record.abbreviation === school).name;

  return (
    <div className="modal-container">
      <form>
        <div className="return-graph" />
        <div className="header">
          <span className="school-title">{schoolName}</span>
        </div>
        <div className="body-content">
          <SelectSensors />
          <DividerSVG />
          <QuerySelector
            queryParamType="Type(s)"
            queryParams={airFactors}
            allowMultiple
          />
          <DividerSVG />
          <QuerySelector
            queryParamType="Intervals"
            queryParams={intervals}
            allowMultiple={false}
          />
          <DividerSVG />
          <TimespanSelector />
          <DividerSVG />
          <button className="export-csv" type="submit">
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
