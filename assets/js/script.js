// Geocoding API
var coordinatesRequest = "http://api.openweathermap.org/geo/1.0/direct?q=";

// One Call API
var weatherRequest = "https://api.openweathermap.org/data/2.5/onecall?lat=";

// API Key for both APIs
const APIKey = "7d7fd26e34daa0f33590c9e7ba3f4a3f";

var searchBtn = $("#search");

var city;
var latitude;
var longitude;

// Grabs the value from the input when search button is clicked
searchBtn.on("click", function() {
    city = $("#city-input").val();
    checkInput(city);
});


// Checks if the user enters an invalid input
function checkInput(city) {
    if (!isNaN(city)) {
        return;
    } else {
        getWeather();
    }
}

function getWeather () {
    getCoords();
    getWeatherForecast();
}

function getCoords () {
    var cityCoordsRequest = coordinatesRequest + city + "&limit=1&appid=" + APIKey;
    getLatLong(cityCoordsRequest);
}

// API call to Geocoding - grabs city's latitude and longitude
function getLatLong(requestURL) {
    fetch(requestURL).then(function(response) {
        return response.json();
    }).then(function(data) {
        latitude = data[0].lat;
        longitude = data[0].lon;
    });
}

function getWeatherForecast () {

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