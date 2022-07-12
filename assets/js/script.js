// Geocoding API
var coordinatesRequest = "http://api.openweathermap.org/geo/1.0/direct?q=";

// One Call API
var weatherRequest = "https://api.openweathermap.org/data/2.5/onecall?lat=";

// API Key for both APIs
const APIKey = "7d7fd26e34daa0f33590c9e7ba3f4a3f";

var searchBtn = $("#search");
var currCity = $("#current-city");
var currTemp = $("#current-temp");
var currWind = $("#current-wind");
var currHumidity = $("#current-humidity");
var currUVIndex = $("#current-uv");

var city;
var latitude;
var longitude;
var currentTemp;
var currentWind;
var currentHumidity;
var currentUVIndex;
var currentWeatherIcon;

// Grabs the value from the input when search button is clicked
searchBtn.on("click", function() {
    city = $("#city-input").val();
    if (!isNaN(city)) {
        return;
    } else {
        getCurrentWeather();
    }
});

// How to get rid of the first error of "bad request"?
function getCurrentWeather() {
    var requestUrl = coordinatesRequest + city + "&limit=1&appid=" + APIKey;
    getCoordinates(requestUrl);
}

function displayCurrentWeather() {
    currCity.text(city); // need to add date and icon *****************************************
    currTemp.text("Temp: " + currentTemp + "°F");
    currWind.text("Wind: " + currentWind);
    currHumidity.text("Humidity: " + currentHumidity + "%");
    currUVIndex.text(currentUVIndex);
}


// API call to Geocoding - grabs city's latitude and longitude
function getCoordinates(requestURL) {
    fetch(requestURL).then(function(response) {
        return response.json();
    }).then(function(data) {
        latitude = data[0].lat;
        longitude = data[0].lon;
        var requestUrl = weatherRequest + latitude + "&lon=" + longitude + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + APIKey; 
        getDayForecast(requestUrl);
    });
}

// API Call to One Call API - grabs weather forecast for current day
function getDayForecast (requestURL) {
    fetch(requestURL).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        currentTime = data.current.dt;
        currentIcon = data.current.weather[0].icon;
        currentTemp = data.current.temp;
        currentWind = data.current.wind_speed;
        currentHumidity = data.current.humidity;
        currentUVIndex = data.current.uvi;
        displayCurrentWeather();
    });
}



// TODO:
// 1) Get city's coords
// 2) Get city's current weather
// 3) Get city's 5 Day forecast
// 4) Print out weather info-related appropriately (Temp, Wind, Humidity, UV Index)
// 5) Set up local storage to store previous searches
















// var city = document.querySelector("#city-input");
// console.log(city);

// if (searchBtn) {
//     searchBtn.addEventListener("click", checksInput);
// }

// // Checks if input is valid, and if so, call OpenWeather API
// function checksInput (city) {
//     if (!isNaN(city)) {
//         return;
//     } else {
        
//         console.log(city);

        // var cityCoordsRequest = coordinatesRequest + city + "&limit=1&appid=" + APIKey;
        // getCityCoords(cityCoordsRequest);
        // var cityWeatherRequest = weatherRequest + city;
//         // getWeather(cityWeatherRequest);
//     }
// }



// function getWeather (requestURL) {
//     fetch(requestURL).then(function(response) {
//         console.log(response);
//         return response.json;
//     }).then(function(data) {
//         console.log(data); 
//     });
// }