

const inputEl = document.querySelector(".input");
const buttonEl = document.querySelector(".search-btn");
const WeatherCard = document.querySelector(".weather-card");

const apiKey = "a98d65b4649b4effb1e112227261706";

inputEl.addEventListener("keydown", async (event) => {

    if(event.key === "Enter"){
        const city = inputEl.value;

        if(city){
            try{
                const weatherData = await getWeatherData(city);
                dispalayWeatherInfo(weatherData);
            }catch(error){
                console.log(error);
                displayError(error);
            }
        }else{
            displayError("Please enter a city");
        }
    }else{
        // WeatherCard.style.display = "none";
        return;
    }

    
})

buttonEl.addEventListener("click", async event => {

    event.preventDefault();

    const city = inputEl.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            dispalayWeatherInfo(weatherData);
        }catch(error){
            console.log(error);
            displayError(error);
        }
    }else{
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {
    
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }else{
        return await response.json();
    }
};

function dispalayWeatherInfo(data){
    // console.log(data);

    const {location: {name: city, country, tz_id, region}, current: {condition: {text, icon}, humidity, temp_c}} = data;
    console.log(data);

    
    // console.log(data.location.name);
    // console.log(data.location.country);
    // console.log(data.location.tz_id);
    // console.log(data.location.region);
    // console.log(data.current.condition.text);
    // console.log(data.current.condition.icon);
    // console.log(data.current.humidity);
    // console.log(data.current.temp_c);

    WeatherCard.textContent = "";
    WeatherCard.style.display = "flex";

    const citiDisplay = document.createElement("p");
    citiDisplay.classList.add("city-name");
    citiDisplay.textContent = `Weather data in ${data.location.name}`;
    WeatherCard.appendChild(citiDisplay);

    const countryDisplay = document.createElement("p");
    countryDisplay.classList.add("country-name");
    countryDisplay.textContent = `Country: ${data.location.country}`;
    WeatherCard.appendChild(countryDisplay);

    const tzDisplay = document.createElement("p");
    tzDisplay.classList.add("time-zone");
    tzDisplay.textContent = `Time zone: ${data.location.tz_id}`;
    WeatherCard.appendChild(tzDisplay);

    const tempDisplay = document.createElement("p");
    tempDisplay.classList.add("temperature");
    tempDisplay.textContent = `Temperature: ${data.current.temp_c}\u00B0 C`
    WeatherCard.appendChild(tempDisplay);

    const humidDisplay = document.createElement("p");
    humidDisplay.classList.add("humidity");
    humidDisplay.textContent = `Humidity: ${data.current.humidity}%`
    WeatherCard.appendChild(humidDisplay);

    const descDisplay = document.createElement("p");
    descDisplay.classList.add("description");
    descDisplay.textContent =`Description: ${data.current.condition.text}`
    WeatherCard.appendChild(descDisplay);

    const iconDIsplay = document.createElement("img");
    iconDIsplay.classList.add("icon");
    iconDIsplay.src = `${data.current.condition.icon}`;
    WeatherCard.appendChild(iconDIsplay);

    
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("error-display");

    WeatherCard.textContent = "";
    WeatherCard.style.display = "flex";
    WeatherCard.appendChild(errorDisplay);
}


