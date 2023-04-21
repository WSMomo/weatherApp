export async function getWeatherData(city, apiKey) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error('Network response was not ok');
  }
}

 export async function getTemperatureData(weatherData){
  return Math.round(weatherData.main.temp);
}

export async function getWindData(weatherData){
  const windSpeedKmh = convertMilesPerHourToKilometersPerHour(weatherData.wind.speed);
  return Math.round(windSpeedKmh);
}

export async function getHumidityData(weatherData){
  return weatherData.main.humidity;
}

export async function getNameData(weatherData){
    return weatherData.name;
}

export async function getCountryName(weatherData){
  return weatherData.sys.country;
}

export async function getWeatherDescription(weatherData){
  const description = weatherData.weather[0].description
  return capitalize(description);

}

export async function getWeatherIcon(weatherData){
  const imageUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`;
  return imageUrl;
}


// UTILITY

function convertMilesPerHourToKilometersPerHour(mph){
  return mph * 1.60934;
}

function capitalize(str){
  const words = str.split(' ');
  for(let i=0; i<words.length; i++){
    words[i] = words[i][0].toUpperCase() + words[i].slice(1);
  }
  return words.join(' ');
}