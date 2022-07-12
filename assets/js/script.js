// OpenWeather API
var weatherRequest = "https://api.openweathermap.org/data/2.5/weather?q=";

// Geocoding API
var coordinatesRequest = "http://api.openweathermap.org/geo/1.0/direct?q=";

// API Key for both APIs
var APIKey = "7d7fd26e34daa0f33590c9e7ba3f4a3f";

var searchBtn = $("#search");
var city;

// Grabs the value from the input when search button is clicked
searchBtn.on("click", function() {
    city = $("#city-input").val();
    checkInput(city);
})


// Checks if the user enters an invalid input
function checkInput(city) {
    if (!isNaN(city)) {
        return;
    } else {
        getWeather(city);
    }
}

function getWeather (city) {
    console.log("Inside of getWeather");
}




















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

function getCityCoords(requestURL) {
    fetch(requestURL).then(function(response) {
        console.log(response);
        return response.json;
    }).then(function(data) {
        console.log(data);
    });
}

// function getWeather (requestURL) {
//     fetch(requestURL).then(function(response) {
//         console.log(response);
//         return response.json;
//     }).then(function(data) {
//         console.log(data); 
//     });
// }