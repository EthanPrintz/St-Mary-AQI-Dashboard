import aqiCategories from '../data/aqiCategories.json';

export const convertRemToPixels = (rem) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
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
