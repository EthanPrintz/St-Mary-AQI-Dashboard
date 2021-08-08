import React, { useEffect } from 'react';
import BarViewController from './BarViewController';
import CurrentSensorDisplay from './CurrentSensorDisplay';
import { convertRemToPixels } from '../../../utils/conversions';
import './style.scss';

function DataViewer(props) {
  let sensorDimensions = [
    convertRemToPixels(24),
    convertRemToPixels(12),
    convertRemToPixels(1),
  ];
  // console.log(props);

  const selectedSchool = props.combinedData.find(
    (school) => school.id === props.selectedSchoolID
  );

  return (
    <div className="body-content">
      <CurrentSensorDisplay
        dimensions={sensorDimensions}
        liveAQI={props.combinedData.length !== 0 ? selectedSchool.liveAQI : '-'}
        liveSensors={
          props.combinedData.length !== 0 ? selectedSchool.sensors : []
        }
      />
      <BarViewController
        sensors={
          props.combinedData.length !== 0
            ? selectedSchool.sensors.map((x) => x['openaq-id'])
            : []
        }
      />
    </div>
  );
}

export default DataViewer;
