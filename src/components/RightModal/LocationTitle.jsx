import React from "react";
import { DISTRICT_MAPPING } from '../../utils/districtMapping';

function LocationTitle(props){
    const { location } = props;
    const locationName = DISTRICT_MAPPING.stmarys.find((record) => record.abbreviation === location).name;

    return (
        <div className="header">
          <span className="location-title">{locationName}</span>
        </div>
    )
}

export default LocationTitle