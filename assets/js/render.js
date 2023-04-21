import * as variables from './variables.js';
import {getNameData, getCountryName, getTemperatureData, getHumidityData, getWindData, getWeatherDescription, getWeatherIcon} from './functions.js';

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
      console.log('hgisagias');
      console.error(error);
    return false;
    });
}


function renderSingleData(data, tagHTML, symbol){
  if(symbol){
    tagHTML.innerText = data + symbol;
  } else {
    tagHTML.innerText = data;
  }
}

function renderImg(imgURL, tagHTML, alt){
  tagHTML.src = imgURL;
  tagHTML.alt = alt;
}