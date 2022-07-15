// Geocoding API
var coordinatesRequest = "http://api.openweathermap.org/geo/1.0/direct?q=";

// One Call API
var weatherRequest = "https://api.openweathermap.org/data/2.5/onecall?lat=";

// OpenWeather icon's URL
var iconUrl = "http://openweathermap.org/img/wn/";

// API Key for both APIs
const APIKey = "7d7fd26e34daa0f33590c9e7ba3f4a3f";

var searchBtn = $("#search");
var currCityElem = $("#current-city");
var currIconElem = $("#current-icon");
var currTempElem = $("#current-temp");
var currWindElem = $("#current-wind");
var currHumidityElem = $("#current-humidity");
var currUVIndexElem = $("#current-uv");
var previousSearch = $(".previous-search");
var uvLabel = $("label");
var dayCard = $(".days");

var city;
var latitude;
var longitude;
var savedCity;

// When clicked, displays the city's current and future conditions
searchBtn.on("click", function() {
    city = $("#city-input").val();
    if (!isNaN(city)) {
        $("#city-input")[0].attributes[2].textContent = "Please enter a valid city";
        return;
    } else {
        savePreviousSearch(city);
        getCurrentWeather();
    }
});

// When clicked, displays a previously-searched city's current and future conditions
previousSearch.on("click", ".city", function() {
    city = $(this)[0].textContent;
    savePreviousSearch(city);
    getCurrentWeather();
});

// Grabs previously searched cities and displays them back in the search history
function getPreviousSearch() {

    // Grab cities that were previously searched
    var savedCities = JSON.parse(localStorage.getItem("city"));

    // If there is nothing in the localStorage, create new array
    if (savedCities === null) {
        savedCities = [];
        return;
    }

    // Loops through the localStorage to make a button for each saved city
    // then appends the buttons back to previous search section
    for (let i = 0; i < savedCities.length; i++) {
        var savedCity = $("<button>");
        savedCity.text(savedCities[i]);
        savedCity.addClass("city");
        previousSearch.append(savedCity);
    }
}

// Saves previous searches of cities
function savePreviousSearch(city) {

    // Makes a button, add city's name to button, add class to button, and append button
    var previousCity = $("<button>");
    previousCity.text(city);
    previousCity.addClass("city");
    previousSearch.append(previousCity);

    // Grab cities that were previously searched
    var savedCities = JSON.parse(localStorage.getItem("city"));

    if (savedCities === null) {
        savedCities = [];
    }

    // Saves the city into the array, savedCities, and then add that array in the localStorage
    savedCities.push(city);
    localStorage.setItem("city", JSON.stringify(savedCities));
}

// Makes a requestUrl to get city's coordinates
function getCurrentWeather() {
    var requestUrl = coordinatesRequest + city + "&limit=1&appid=" + APIKey;
    getCoordinates(requestUrl);
}

// API call to Geocoding - grabs city's latitude and longitude
function getCoordinates(requestURL) {
    fetch(requestURL).then(function(response) {
        return response.json();
    }).then(function(data) {
        latitude = data[0].lat;
        longitude = data[0].lon;

        // Makes a requestUrl ready to call an API that can give forecast info
        var requestUrl = weatherRequest + latitude + "&lon=" + longitude + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + APIKey; 
        getForecast(requestUrl);
    });
}

// Displays the scale of UV index
// Each color informs a different level
function displayUVScale (currentWeather) {
    if (currentWeather.uv < 3) {
        currUVIndexElem[0].style.backgroundColor = "#199b40"; // green - low
    } else if (3 <= currentWeather.uv < 6 ) {
        currUVIndexElem[0].style.backgroundColor = "#e4d507"; // yellow - moderate
    } else if (6 <= currentWeather.uv < 8) {
        currUVIndexElem[0].style.backgroundColor = "#e47d07"; // orange - high
    } else if (8 <= currentWeather.uv < 11) {
        currUVIndexElem[0].style.backgroundColor = "#e47d07"; // red - very high
    } else {
        currUVIndexElem[0].style.backgroundColor = "#8c07e4"; // purple - extreme
    }
}

// Displays the current forecast and the 5-Days forecast
function displayForecast(currentWeather, daysForecast) {
    var currentDay = new Date();

    // Displays current forecast - city, weather icon and its alt, temp, wind, humidity, and UV index
    currCityElem.text(city + " (" + currentDay.toLocaleDateString(currentWeather.time) + ") ");
    currIconElem[0].attributes[1].textContent = iconUrl + currentWeather.icon + ".png";
    currIconElem[0].attributes[2].textContent = currentWeather.iconAlt;
    currTempElem.text("Temp: " + currentWeather.temp + "°F");
    currWindElem.text("Wind: " + currentWeather.wind + " MPH");
    currHumidityElem.text("Humidity: " + currentWeather.humidity + "%");
    currUVIndexElem.text(currentWeather.uv);

    // Loops through each dayCard to display date, weather icon and its alt, temperature, wind, and humidity
    var nextDay = new Date(currentDay);
    for (let i = 0; i < 5; i++) {
        nextDay.setDate(nextDay.getDate() + 1);
        dayCard[0].children[i].children[0].textContent = nextDay.toLocaleDateString();
        dayCard[0].children[i].children[1].setAttribute("src", iconUrl + daysForecast[i].icon + ".png");
        dayCard[0].children[i].children[1].setAttribute("alt", daysForecast[i].iconAlt);
        dayCard[0].children[i].children[2].textContent = "Temp: " + daysForecast[i].temp + "°F";
        dayCard[0].children[i].children[3].textContent = "Wind: " + daysForecast[i].wind + " MPH";
        dayCard[0].children[i].children[4].textContent = "Humidity: " + daysForecast[i].humidity + "%";
    }
    displayUVScale(currentWeather);
}

// API Call to One Call API - grabs weather forecast for current day
function getForecast (requestUrl) {
    fetch(requestUrl).then(function(response) {
        return response.json();
    }).then(function(data) {

        // Stores current weather data (time, weather icon and alt, temperature, wind, humidity, AND UV index) in an object
        var currentWeather = {
            time: data.current.dt,
            icon: data.current.weather[0].icon,
            iconAlt: data.current.weather[0].description,
            temp: data.current.temp,
            wind: data.current.wind_speed,
            humidity: data.current.humidity,
            uv: data.current.uvi,
        }

        // Makes new array to store the 5 Days' Forecast
        // Each index of the array contains a day's forecast info (time, weather icon and alt, temperature, wind, and humidity)
        var daysForecast = [];
        for (let i = 0; i < 5; i++) {
            var day = {
                time: data.daily[i].dt,
                icon: data.daily[i].weather[0].icon,
                iconAlt: data.daily[i].weather[0].description,
                temp: data.daily[i].temp.day,
                wind: data.daily[i].wind_speed,
                humidity: data.daily[i].humidity,
            }
            daysForecast.push(day);
        }
        displayForecast(currentWeather, daysForecast);
    });
}

// Calls the following function
getPreviousSearch();