import React, { useState } from 'react';
import './style.scss';

function TimespanSelector(props) {
  const {
    firstDate, setFirstDate, lastDate, setLastDate, today,
  } = props;

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

  function getMaximumEarlyDate() {
    const maximumEarlyDate = new Date();
    maximumEarlyDate.setDate(lastDate.getDate() - 1);
    return maximumEarlyDate.toISOString().slice(0, 10);
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

export default TimespanSelector;
