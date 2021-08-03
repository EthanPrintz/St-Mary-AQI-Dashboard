import React from "react";
import { DISTRICT_MAPPING } from '../../utils/districtMapping';
import { convertAQIToColor } from '../../utils/conversions';

function LocationTitle(props){
    const { location } = props;
    const locationName = DISTRICT_MAPPING.stmarys.find((record) => record.abbreviation === location).name;

    return (
      <header className="header" style={{"backgroundColor": convertAQIToColor(props.liveAQI)}}>
        <span className="location-title">{props.schoolName}</span>
      </header>
    );
}

export default LocationTitle
