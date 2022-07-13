// Geocoding API
var coordinatesRequest = "http://api.openweathermap.org/geo/1.0/direct?q=";

// One Call API
var weatherRequest = "https://api.openweathermap.org/data/2.5/onecall?lat=";

// API Key for both APIs
const APIKey = "7d7fd26e34daa0f33590c9e7ba3f4a3f";

var searchBtn = $("#search");
var currCity = $("#current-city");
var currIcon = $("#current-icon");
var currTemp = $("#current-temp");
var currWind = $("#current-wind");
var currHumidity = $("#current-humidity");
var currUVIndex = $("#current-uv");
var previousSearch = $(".city-search");
var dayCard = $(".days");

var city;
var latitude;
var longitude;
var currentIcon;
var currentIconAlt;
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
        savePreviousCity();
        getCurrentWeather();
    }
});

// console.log(previousSearch);
// console.log(previousSearch[0].children);
// console.log(previousSearch[0].children[4]);

function savePreviousCity() {
    if (previousSearch[0].children.length < 12) {
        // create the button and add it under the "city-search"
        var previousCity = $("<button>");
        previousCity.text(city);
        previousCity.addClass("city");
        previousSearch.append(previousCity);
    } else {
        
    }
}

// 
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


console.log(currIcon);

// Displays the current forecast and the 5-Days forecast
function displayForecast(daysForecast) {
    var date = new Date();
    var iconUrl = "http://openweathermap.org/img/wn/";
    console.log(currIcon);
    console.log(currIcon[0].src);
    console.log(currIcon[0].alt);
    currIcon[0].src = iconUrl + currentIcon + ".png";
    currIcon[0].alt = currentIconAlt;

    currCity.text(city + " (" + date.toLocaleDateString(currentTime) + ") " + currIcon); // + iconUrl + currentIcon + ".png)"); // need to add date and icon *****************************************
    
    // These below work but pic won't show up

    console.log(currIcon);
    console.log(currIcon[0].src);
    console.log(currIcon[0].alt);
    // currCity[0].children[0].children[0].attributes[0].textContent = iconUrl + currentIcon + ".png";
    // currCity[0].children[0].children[0].attributes[1].textContent = currentIconAlt;
    // currCity[0].children[0].children[0].attributes[0].setAttribute("src", iconUrl + currentIcon + ".png");
    // currCity[0].children[0].children[0].attributes[1].setAttribute("alt", currentIconAlt);
    currTemp.text("Temp: " + currentTemp + "°F");
    currWind.text("Wind: " + currentWind + " MPH");
    currHumidity.text("Humidity: " + currentHumidity + "%");
    currUVIndex.text(currentUVIndex);

    // console.log(daysForecast[1].weather[0].icon);
    // console.log(iconUrl + JSON.stringify(daysForecast[1].weather[0].icon) + "@2x.png");
    // Loops through children element of the article and sets the children's element 
    for (let i = 0; i < 5; i++) {
        console.log(dayCard[0].children[i].children[1]);
        dayCard[0].children[i].children[1].setAttribute("src", iconUrl + daysForecast[i].icon + ".png");
        dayCard[0].children[i].children[1].setAttribute("alt", daysForecast[i].iconAlt);
        dayCard[0].children[i].children[2].textContent = "Temp: " + daysForecast[i].temp + "°F";
        dayCard[0].children[i].children[3].textContent = "Wind: " + daysForecast[i].wind + " MPH";
        dayCard[0].children[i].children[4].textContent = "Humidity: " + daysForecast[i].humidity + "%";
    }

    // var testArticle = $(".days");
    // console.log(testArticle);
    // console.log(testArticle[0].children[0]); // article
    // console.log(testArticle[0].children[0].children[0]); // h4

    // dayCard[0].children[0].children[0].text(); // this is the date
    // dayCard[0].children[0].children[1].text(); // this is the icon

    // dayCard[0].children[0].children[2].textContent = "Temp: " + daysForecast[0].temp + "°F";
    // dayCard[0].children[0].children[3].textContent = "Wind: " + daysForecast[0].wind + " MPH";
    // dayCard[0].children[0].children[4].textContent = "Humidity: " + daysForecast[0].humidity + "%";

    // dayCard[0].children[1].children[2].textContent = "Temp: " + daysForecast[1].temp + "°F";
    // dayCard[0].children[1].children[3].textContent = "Wind: " + daysForecast[1].wind + " MPH";
    // dayCard[0].children[1].children[4].textContent = "Humidity: " + daysForecast[1].humidity + "%";

    // dayCard[0].children[2].children[2].textContent = "Temp: " + daysForecast[2].temp + "°F";
    // dayCard[0].children[2].children[3].textContent = "Wind: " + daysForecast[2].wind + " MPH";
    // dayCard[0].children[2].children[4].textContent = "Humidity: " + daysForecast[2].humidity + "%";

    // dayCard[0].children[3].children[2].textContent = "Temp: " + daysForecast[3].temp + "°F";
    // dayCard[0].children[3].children[3].textContent = "Wind: " + daysForecast[3].wind + " MPH";
    // dayCard[0].children[3].children[4].textContent = "Humidity: " + daysForecast[3].humidity + "%";

    // dayCard[0].children[4].children[2].textContent = "Temp: " + daysForecast[4].temp + "°F";
    // dayCard[0].children[4].children[3].textContent = "Wind: " + daysForecast[4].wind + " MPH";
    // dayCard[0].children[4].children[4].textContent = "Humidity: " + daysForecast[4].humidity + "%";

}

// API Call to One Call API - grabs weather forecast for current day
function getForecast (requestUrl) {
    fetch(requestUrl).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        currentTime = data.current.dt;
        currentIcon = data.current.weather[0].icon;
        currentIconAlt = data.current.weather[0].description;
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
                iconAlt: data.daily[i].weather[0].description,
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