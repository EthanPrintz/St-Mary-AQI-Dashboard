import React from "react";
import { DISTRICT_MAPPING } from '../../utils/districtMapping';
import { convertAQIToColor } from '../../utils/conversions';

function LocationTitle(props){
    const { location } = props;
    const locationName = DISTRICT_MAPPING.stmarys.find((record) => record.abbreviation === location).name;

    return (
	  /* TODO put average aqi to change header, for now default to green */
      <header className="header" style={{"backgroundColor": convertAQIToColor(0)}}>
        <span className="location-title">{locationName}</span>
      </header>
    );
}

export default LocationTitle
