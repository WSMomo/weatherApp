import * as variables from './variables.js';
import { getWeatherData } from './functions.js';
import { renderWeatherData } from './render.js';

variables.form.addEventListener('submit', (event) => {
    event.preventDefault();
    main();
})

// This function is the main entry point of the application. 
// It retrieves the user's selected city from the search input field, 
// calls the getWeatherData function to retrieve weather data for that city, 
// and then checks the returned data to determine whether to render the weather data 
// (if the API call was successful and returned valid data) 
// or to display an error message (if the API call was unsuccessful or returned invalid data).
async function main() {
    const city = variables.searchCity.value;
    const weatherData = await getWeatherData(city, variables.apiKey);
    if (weatherData && weatherData.cod === 200) {
        renderWeatherData(weatherData);
        variables.errorOutput.style.display = 'none';
        variables.output.style.display = 'flex';
    } else {
        variables.errorOutput.style.display = 'flex';
        variables.output.style.display = 'none';
    }
}
