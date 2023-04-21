import * as variables from './variables.js';
import { getWeatherData } from './functions.js';
import { renderWeatherData } from './render.js';
variables.form.addEventListener('submit', (event) => {
    event.preventDefault();
    main();
})

async function main() {
    const city = variables.searchCity.value;
    const weatherData = await getWeatherData(city, variables.apiKey);
    if (weatherData && weatherData.cod === 200) {
        console.log(weatherData);
        renderWeatherData(weatherData);
        variables.errorOutput.style.display = 'none';
        variables.output.style.display = 'flex';
    } else {
        console.log(weatherData);
        variables.errorOutput.style.display = 'flex';
        variables.output.style.display = 'none';
    }
}
