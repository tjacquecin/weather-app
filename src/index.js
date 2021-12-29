let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();
Date.innerHTML = `${day} ${hour}:${minute}`;

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `  <div class="col-2"> 
                <div class="weather-forecast-date">${day}</div>
                <img
                src="http://openweathermap.org/img/wn/10d@2x.png"
                alt=""
                width="42"
                />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max"> 
                    18° </span>
                  <span class="weather-forecast-temperature-min"> 
                    12° </span>
                </div>
              </div>
              `;
  });
  let forecastHTML = forecastHTML + `</div>`;
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
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
//Search for a city
function searchCity(city) {
  let apiKey = "3f2cf3b8e49f91e874d96ca20936b424";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

//Change to Celsius
function showCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector("#current-temp");
  celsius.innerHTML = "19";
}
let displaycelsius = document.querySelector("#Celsius");
displaycelsius.addEventListener("click", showCelsius);

//Change to Fahrenheit
function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#current-temp");
  fahrenheit.innerHTML = "66";
}
let displayfahrenheit = document.querySelector("#Fahrenheit");
displayfahrenheit.addEventListener("click", showFahrenheit);

let showLocationButton = document.querySelector("#show-location-button");
showLocationButton.addEventListener("click", showLocation);

searchCity("Boston");
displayForecast();
