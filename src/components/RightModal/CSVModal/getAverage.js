export function createDataPointObj(time, reading) {
  return { time, reading };
}

export function getAverage(dataASC, timeInHours) {
  const timeInMilliseconds = timeInHours * 3600000;
  const BASE_LINE = new Date(dataASC[0].time).getTime();
  const standardize = (time) => {
    return (time - BASE_LINE) / timeInMilliseconds;
  };
  // structure of datum:
  // {
  //    time: UTC String
  //    reading: integer
  // }

  const bucketSums = [];
  dataASC.forEach((datum) => {
    const timeInteger = new Date(datum.time).getTime();
    const standardizedTime = standardize(timeInteger);
    const reading = datum.reading;

    while (standardizedTime >= bucketSums.length) {
      bucketSums.push({
        count: 0,
        summedIndex: 0,
        baselineDate: new Date(
          timeInteger - (timeInteger % timeInMilliseconds)
        ).toUTCString(),
      });
    }

    const bucketNumber = Math.floor(standardizedTime);
    bucketSums[bucketNumber].count += 1;
    bucketSums[bucketNumber].summedIndex += reading;
  });

  const bucketAverages = bucketSums.map((bucket) => {
    return createDataPointObj(
      bucket.baselineDate,
      Math.round((bucket.summedIndex * 1000) / bucket.count) / 1000
    );
  });
  return bucketAverages;
}

