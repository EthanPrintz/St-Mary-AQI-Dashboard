import React from "react";
import { convertAQIToColor } from '../../utils/conversions';

function LocationTitle(props){
    const { schoolName } = props;

    return (
      <header className="header" style={{"backgroundColor": convertAQIToColor(props.liveAQI)}}>
        <span className="location-title">{schoolName}</span>
      </header>
    );
}

export default LocationTitle
