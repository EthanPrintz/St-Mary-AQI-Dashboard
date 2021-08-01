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

    const returnData = {
      locationId: sensorData[1][0],
      locationString: sensorData[1][1],
      latitude: sensorData[1][9],
      longitutde: sensorData[1][10],
      readings,
    };

    console.log(returnData);
    return returnData;
  });
};
