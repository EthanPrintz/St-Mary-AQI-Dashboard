import aqiCategories from '../data/aqiCategories.json';

export const convertRemToPixels = (rem) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};

export const convertAQIToDescription = (aqi) => {
  let returnString = '';
  aqiCategories.forEach((cat) => {
    if (cat.low <= aqi && cat.high >= aqi) {
      returnString = cat.guidance;
    }
  });
  return returnString;
};

export const convertAQIToColor = (aqi) => {
  let returnHex = '';
  aqiCategories.forEach((cat) => {
    if (cat.low <= aqi && cat.high >= aqi) {
      returnHex = cat.hex;
    }
  });
  return returnHex;
};

export const convertPM25ToColor = (aqi) => {
  let returnHex = '';
  aqiCategories.forEach((cat) => {
    if (cat.pm25low <= aqi && cat.pm25high >= aqi) {
      returnHex = cat.hex;
    }
  });
  return returnHex;
};

export const convertPM10ToColor = (aqi) => {
  let returnHex = '';
  aqiCategories.forEach((cat) => {
    if (cat.pm10low <= aqi && cat.pm10high >= aqi) {
      returnHex = cat.hex;
    }
  });
  return returnHex;
};
