var APIKey = "7d7fd26e34daa0f33590c9e7ba3f4a3f";
var queryURL = "api.openweathermap.org/data/2.5/weather?q=";

var searchBtn = document.querySelector("#search");
var city = document.querySelector("#city-input");


if (searchBtn) {
    searchBtn.addEventListener("click", getWeather);
}

// Checks if input is valid, and if so, call OpenWeather API
function checksInput (city) {
    if (!isNaN(city)) {
        return;
    } else {
        getWeather(city);
    }
}

function getWeather (city) {
    fetch(queryURL).then

}