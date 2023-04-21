import * as variables from './variables.js';
import {getNameData, getCountryName, getTemperatureData, getHumidityData, getWindData, getWeatherDescription, getWeatherIcon} from './functions.js';

// This function takes weather data as input and renders various data points (city name, temperature, wind speed, humidity, 
// weather condition description, and weather icon) to the DOM using other helper functions. 
// It uses Promise.all to make all the necessary function calls and then renders the data points by calling the renderSingleData and renderImg functions.
export function renderWeatherData(weatherData){
  Promise.all([
    getNameData(weatherData),
    getCountryName(weatherData),
    getTemperatureData(weatherData),
    getWindData(weatherData),
    getHumidityData(weatherData),
    getWeatherDescription(weatherData),
    getWeatherIcon(weatherData)
    ])
    .then(([name, country, temp, wind, humidity, description, image]) => {
    const cityHTML = `${name}, ${country}`;
    renderSingleData(cityHTML, variables.infoCityName);
    renderSingleData(temp, variables.temp, '°C');
    renderSingleData(wind, variables.wind, ' km/h');
    renderSingleData(humidity, variables.humidity, '%');
    renderSingleData(description, variables.infoCondition);
    renderImg(image, variables.imgCondition, description);
    })
    .catch(error => {
      console.error(error);
    return false;
    });
}

// This function takes data, a DOM element, and an optional symbol as inputs 
// and sets the text content of the DOM element to the data followed by the symbol (if provided).
function renderSingleData(data, tagHTML, symbol){
  if(symbol){
    tagHTML.innerText = data + symbol;
  } else {
    tagHTML.innerText = data;
  }
}

// This function takes an image URL, a DOM img element, 
// and an alt attribute value as inputs and sets the src and alt attributes of the img element to the provided values.
function renderImg(imgURL, tagHTML, alt){
  tagHTML.src = imgURL;
  tagHTML.alt = alt;
}