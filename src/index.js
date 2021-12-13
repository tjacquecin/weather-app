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

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.main.wind;
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
  let celsius = document.querySelector("h2");
  celsius.innerHTML = "19";
}
let displaycelsius = document.querySelector("#Celsius");
displaycelsius.addEventListener("click", showCelsius);

//Change to Fahrenheid
function showFahrenheid(event) {
  event.preventDefault();
  let fahrenheid = document.querySelector("h2");
  fahrenheid.innerHTML = "66";
}
let displayfahrenheid = document.querySelector("#Fahrenheid");
displayfahrenheid.addEventListener("click", showFahrenheid);

let showLocationButton = document.querySelector("#show-location-button");
showLocationButton.addEventListener("click", showLocation);

searchCity("Boston");
