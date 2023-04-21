// This function takes a city name and an API key as inputs and uses the fetch API to make a request to the OpenWeatherMap API for weather data for that city. 
// The response is returned as a JSON object.
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
// This function takes weather data as input and returns the temperature in Celsius as a rounded integer.
 export async function getTemperatureData(weatherData){
  return Math.round(weatherData.main.temp);
}

// This function takes weather data as input and returns the wind speed in kilometers per hour as a rounded integer.
export async function getWindData(weatherData){
  const windSpeedKmh = convertMilesPerHourToKilometersPerHour(weatherData.wind.speed);
  return Math.round(windSpeedKmh);
}

// This function takes weather data as input and returns the humidity percentage as an integer.
export async function getHumidityData(weatherData){
  return weatherData.main.humidity;
}

// This function takes weather data as input and returns the name of the city as a string.
export async function getNameData(weatherData){
    return weatherData.name;
}

// This function takes weather data as input and returns the name of the country as a string.
export async function getCountryName(weatherData){
  return weatherData.sys.country;
}

// This function takes weather data as input and returns the weather description as a string with the first letter of each word capitalized.
export async function getWeatherDescription(weatherData){
  const description = weatherData.weather[0].description
  return capitalize(description);

}

// This function takes weather data as input and returns a URL for an icon representing the current weather condition.
export async function getWeatherIcon(weatherData){
  const imageUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`;
  return imageUrl;
}


// UTILITY

// This is a utility function that takes a speed in miles per hour and converts it to kilometers per hour.
function convertMilesPerHourToKilometersPerHour(mph){
  return mph * 1.60934;
}

// This is a utility function that takes a string and returns it with the first letter of each word capitalized.
function capitalize(str){
  const words = str.split(' ');
  for(let i=0; i<words.length; i++){
    words[i] = words[i][0].toUpperCase() + words[i].slice(1);
  }
  return words.join(' ');
}

