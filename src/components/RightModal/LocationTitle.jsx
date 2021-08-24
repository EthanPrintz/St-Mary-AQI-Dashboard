import React from 'react';
import { convertAQIToColor } from '../../utils/conversions';

function LocationTitle(props) {
  const { schoolName, setSelectedSchoolID } = props;
  return (
    <header
      className="header"
      style={{ backgroundColor: convertAQIToColor(props.liveAQI) }}
    >
      <span className="location-title">{schoolName}</span>
      <div className="modal-close" onClick={() => setSelectedSchoolID(0)}>
        <svg
          className="modal-close-icon"
          viewBox="0 0 23 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.6276 5.71076L5.60204 15.4826C5.20654 15.8681 5.19843 16.5012 5.58391 16.8967C5.9694 17.2922 6.60251 17.3003 6.99801 16.9148L17.0235 7.14298C17.419 6.75749 17.4272 6.12437 17.0417 5.72888C16.6562 5.33338 16.0231 5.32527 15.6276 5.71076Z"
            fill={convertAQIToColor(props.liveAQI)}
          />
          <path
            d="M16.9146 15.6276L7.14293 5.60198C6.75744 5.20648 6.12433 5.19836 5.72883 5.58384C5.33333 5.96933 5.32521 6.60244 5.71069 6.99794L15.4824 17.0236C15.8679 17.4191 16.501 17.4272 16.8965 17.0417C17.292 16.6562 17.3001 16.0231 16.9146 15.6276Z"
            fill={convertAQIToColor(props.liveAQI)}
          />
        </svg>
      </div>
    </header>
  );
}

export default LocationTitle;
