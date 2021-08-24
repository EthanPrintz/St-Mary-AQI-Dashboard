import { readString } from 'react-papaparse';

/*
// locationId, location, city, coutnry, utc, local, parameter, value, unit, latitutde, longitude
// 0         , 1       , 2   , 3      , 4  , 5    , 6        , 7    , 8   , 9        , 10
*/
export const getSensorDataByURL = (url) => {
  const response = fetch(url)
    .then((res) => res.text())
    .then((csv) => readString(csv))
    .catch((err) => console.log(err));

  response.then((arr) => {
    const sensorData = arr.data.slice(1);
    let readings = [];
    const data = sensorData.slice(1);
    data.forEach((reading) => {
      const utcTimestamp = reading[4];
      const readingType = reading[6];
      const readingValue = reading[7];

      if (readings.some((r) => r.utc === utcTimestamp)) {
        readings[readings.findIndex((r) => r.utc === utcTimestamp)][
          readingType
        ] = readingValue;
      } else {
        readings.push({
          utc: utcTimestamp,
          [readingType]: readingValue,
        });
      }
    });

    return {
      locationId: sensorData[1][0],
      locationString: sensorData[1][1],
      latitude: sensorData[1][9],
      longitutde: sensorData[1][10],
      readings,
    };
  });
};

export const getLiveSensorData = async () => {
  // Set URL to query for live AQI data
  const liveQueryURL =
    // 'https://nqyzh7zcib.execute-api.us-east-1.amazonaws.com/prod/latest';
    'https://utbo5or9sk.execute-api.us-east-1.amazonaws.com/dev/latest';
  const response = await fetch(liveQueryURL);
  const json = await response.json();
  return json.smchdSensors.data;
};

export const getCountyAQI = async () => {
  // Set URL to query for live AQI data
  const liveQueryURL =
    // 'https://nqyzh7zcib.execute-api.us-east-1.amazonaws.com/prod/latest';
    'https://utbo5or9sk.execute-api.us-east-1.amazonaws.com/dev/latest';
  const response = await fetch(liveQueryURL);
  const json = await response.json();
  let sensorAvg = 0;
  let numSensors = 0;
  json.smchdSensors.data.forEach((sensor) => {
    sensorAvg += sensor.AQI;
    if (sensor.AQI > 0) numSensors++;
  });
  sensorAvg /= numSensors;
  return sensorAvg;
};
