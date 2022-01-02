let now = new Date();
console.log(now.getMonth());

let day = now.getDay();
let hour = now.getHours();
let minute = now.getMinutes();
Date.innerHTML = `${day} ${hour}:${minute}`;

const dateText = document.querySelector(".now");
dateText.innerHTML = now;

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;
  fahrenheitTemperature = response.data.main.temp;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function searchCity(city) {
  city = 4930956;
  let apiKey = "3f2cf3b8e49f91e874d96ca20936b424";
  let apiURL = `https://openweathermap.org/data/2.5/forecast/climate?id=${city}&appid=${apiKey}`;
  axios.get(apiURL).then(displayWeatherCondition);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function showLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}
let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

//Change to Celsius
function displayCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector("#current-temp");
  celsius.innerHTML = "19";
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let displaycelsius = document.querySelector("#Celsius");
console.log(displaycelsius);
displaycelsius.addEventListener("click", displayCelsius);

//Change to Fahrenheit
function displayFahrenheit(event) {
  event.preventDefault();
  let displayfahrenheit = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  let fahrenheit = document.querySelector("#current-temp");
  fahrenheit.innerHTML = "66";
}
let displayfahrenheit = document.querySelector("#Fahrenheit");
displayfahrenheit.addEventListener("click", displayFahrenheit);

let showLocationButton = document.querySelector("#show-location-button");
showLocationButton.addEventListener("click", showLocation);

searchCity("Boston");
displayForecast();
