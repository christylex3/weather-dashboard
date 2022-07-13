// Geocoding API
var coordinatesRequest = "http://api.openweathermap.org/geo/1.0/direct?q=";

// One Call API
var weatherRequest = "https://api.openweathermap.org/data/2.5/onecall?lat=";

// Daily Forecast 16 Days
// var forecastRequest = "https://api.openweathermap.org/data/2.5/forecast/daily?lat=";

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
        // get5DaysForecast();
    }
});

// How to get rid of the first error of "bad request"?
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
        var requestUrl = weatherRequest + latitude + "&lon=" + longitude + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + APIKey; 
        getForecast(requestUrl);
    });
}

// var testArticle = $(".days");
// console.log(testArticle);
// console.log(testArticle[0].children[0]); // article
// console.log(testArticle[0].children[0].children[0]); // h4
var dayCard = $(".days");
    // dayCard[0].children[0].children[2].text("Temp: " + daysForecast[0].day.temp);
    // console.log(daysForecast[0].day.temp);


function displayForecast(daysForecast) {
    var date = new Date();
    currCity.text(city + " (" + date.toLocaleDateString(currentTime) + ")"); // need to add date and icon *****************************************
    currTemp.text("Temp: " + currentTemp + "°F");
    currWind.text("Wind: " + currentWind);
    currHumidity.text("Humidity: " + currentHumidity + "%");
    currUVIndex.text(currentUVIndex);

    // make a for-loop to loop the weather cards

    // dayCard[0].children[0].children[0].text(); // this is the date
    // dayCard[0].children[0].children[1].text(); // this is the icon
    dayCard[0].children[0].children[2].textContent = "Temp: " + daysForecast[0].temp + "°F";
    dayCard[0].children[0].children[3].textContent = "Wind: " + daysForecast[0].wind + " MPH";
    dayCard[0].children[0].children[4].textContent = "Humidity: " + daysForecast[0].humidity + "%";

    dayCard[0].children[1].children[2].textContent = "Temp: " + daysForecast[1].temp + "°F";
    dayCard[0].children[1].children[3].textContent = "Wind: " + daysForecast[1].wind + " MPH";
    dayCard[0].children[1].children[4].textContent = "Humidity: " + daysForecast[1].humidity + "%";

    dayCard[0].children[2].children[2].textContent = "Temp: " + daysForecast[2].temp + "°F";
    dayCard[0].children[2].children[3].textContent = "Wind: " + daysForecast[2].wind + " MPH";
    dayCard[0].children[2].children[4].textContent = "Humidity: " + daysForecast[2].humidity + "%";

    dayCard[0].children[3].children[2].textContent = "Temp: " + daysForecast[3].temp + "°F";
    dayCard[0].children[3].children[3].textContent = "Wind: " + daysForecast[3].wind + " MPH";
    dayCard[0].children[3].children[4].textContent = "Humidity: " + daysForecast[3].humidity + "%";

    dayCard[0].children[4].children[2].textContent = "Temp: " + daysForecast[4].temp + "°F";
    dayCard[0].children[4].children[3].textContent = "Wind: " + daysForecast[4].wind + " MPH";
    dayCard[0].children[4].children[4].textContent = "Humidity: " + daysForecast[4].humidity + "%";

    console.log(daysForecast[0].temp);


    // for (let i = 0; i < 5; i ++) {
    // }

}

// API Call to One Call API - grabs weather forecast for current day
function getForecast (requestUrl) {
    fetch(requestUrl).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        currentTime = data.current.dt;
        currentIcon = data.current.weather[0].icon;
        currentTemp = data.current.temp;
        currentWind = data.current.wind_speed;
        currentHumidity = data.current.humidity;
        currentUVIndex = data.current.uvi;

        // need to make a for-loop to store data
        var daysForecast = [];
        for (let i = 0; i < 5; i++) {
            var day = {
                time: data.daily[i].dt,
                icon: data.daily[i].weather[0].icon,
                temp: data.daily[i].temp.day,
                wind: data.daily[i].wind_speed,
                humidity: data.daily[i].humidity,
            }
            // console.log(i + " day array: " + JSON.stringify(day));
            daysForecast.push(day);
            // console.log(i + " daysForecast: " + JSON.stringify(daysForecast));
        }
        displayForecast(daysForecast);
    });
}

// TODO:
// 1) Get city's coords
// 2) Get city's current weather
// 3) Get city's 5 Day forecast
// 4) Print out weather info-related appropriately (Temp, Wind, Humidity, UV Index)
// 5) Set up local storage to store previous searches