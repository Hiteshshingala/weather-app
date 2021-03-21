let weatherData = {};
let weatherElement = document.getElementById('weather-list');
let weatherCardElement = document.getElementById('card-weather-list');
const todayDayElement = document.getElementById('today-day');
const todayDateElement = document.getElementById('today-date');
const todayTempElement = document.getElementById('today-temp');
const todayWeatherTypeElement = document.getElementById('today-weather-type');
const lattitude = document.getElementById('lattitude');
const longitude = document.getElementById('longitude');
const lattitudeErrorElement = document.getElementById('lattitude-error');
const longitudeErrorElement = document.getElementById('longitude-error');
const weatherTextElement = document.getElementById('weather-text');
const appElement = document.getElementsByClassName('app')
const loaderElement = document.getElementsByClassName('loader')


async function getWwatherData(lat = '-73.98529171943665', lang = '40.75872069597532') {
    loaderStart();
    removechildNode(weatherCardElement);
    weatherTextElement.innerHTML = `weather for lattitude = ${lat} & longitude = ${lang}`
    const weatherDataResp = await getCurrentWeather(lat, lang);
    // const weatherDataResp = {"data":{"timelines":[{"timestep":"1d","startTime":"2021-03-20T03:00:00Z","endTime":"2021-04-03T03:00:00Z","intervals":[{"startTime":"2021-03-20T03:00:00Z","values":{"temperature":-40.79,"weatherCode":1100,"windSpeed":8.6}},{"startTime":"2021-03-21T03:00:00Z","values":{"temperature":-42.18,"weatherCode":1101,"windSpeed":11.23}},{"startTime":"2021-03-22T03:00:00Z","values":{"temperature":-42.28,"weatherCode":1102,"windSpeed":11.56}},{"startTime":"2021-03-23T03:00:00Z","values":{"temperature":-37.73,"weatherCode":1102,"windSpeed":7.15}},{"startTime":"2021-03-24T03:00:00Z","values":{"temperature":-40.76,"weatherCode":1100,"windSpeed":8.24}},{"startTime":"2021-03-25T03:00:00Z","values":{"temperature":-43.61,"weatherCode":1102,"windSpeed":7.93}},{"startTime":"2021-03-26T03:00:00Z","values":{"temperature":-39.99,"weatherCode":1102,"windSpeed":7.57}},{"startTime":"2021-03-27T03:00:00Z","values":{"temperature":-40.66,"weatherCode":1102,"windSpeed":9.18}},{"startTime":"2021-03-28T03:00:00Z","values":{"temperature":-35.89,"weatherCode":2100,"windSpeed":8.36}},{"startTime":"2021-03-29T03:00:00Z","values":{"temperature":-37.4,"weatherCode":2100,"windSpeed":7.97}},{"startTime":"2021-03-30T03:00:00Z","values":{"temperature":-44.33,"weatherCode":1102,"windSpeed":8.97}},{"startTime":"2021-03-31T03:00:00Z","values":{"temperature":-43.38,"weatherCode":1102,"windSpeed":8.57}},{"startTime":"2021-04-01T03:00:00Z","values":{"temperature":-42.65,"weatherCode":2100,"windSpeed":7.49}},{"startTime":"2021-04-02T03:00:00Z","values":{"temperature":-35.42,"weatherCode":5001,"windSpeed":9.64}},{"startTime":"2021-04-03T03:00:00Z","values":{"temperature":-34.65,"weatherCode":5001,"windSpeed":9.76}}]}]}};
    weatherData = weatherDataResp;
    loaderStop();
    if(weatherDataResp && weatherDataResp.data && weatherDataResp.data.timelines && weatherDataResp.data.timelines.length > 0) {
        weatherDataResp.data.timelines[0].intervals.forEach((v, index) => {
            if(index < 8) {
                if(index == 0) {
                    todayDayElement.innerHTML = getDay(v.startTime);
                    todayDateElement.innerHTML = new Date(v.startTime).toUTCString();
                    todayTempElement.innerHTML = v.values.temperature + `°`;
                    todayWeatherTypeElement.innerHTML =  getWeatherTypeByCode(v.values.weatherCode);
                } else {
                    drawCardWeatherElement(v);
                }
            }
        })
    }
}

function drawWeatherElement(data) {
    const div = document.createElement("div");
    div.classList.add('col-sm-1');
    div.innerHTML = getDay(data.startTime);
    const childDiv = document.createElement("div");
    childDiv.innerHTML = data.values.temperature + `°`;
    div.appendChild(childDiv);
    weatherElement.appendChild(div);
}

function drawCardWeatherElement(data) {
    const div = document.createElement("div");
    div.classList.add('weakly-weather-item');
    const childP1Tag = document.createElement("p");
    childP1Tag.classList.add('mb-1');
    childP1Tag.innerHTML = getDay(data.startTime);
    const childP3Tag = document.createElement("p");
    childP3Tag.classList.add('mb-3');
    childP3Tag.innerHTML = getWeatherTypeByCode(data.values.weatherCode);
    const childP2Tag = document.createElement("p");
    childP2Tag.classList.add('mb-0');
    childP2Tag.innerHTML = data.values.temperature + `°`;
    div.appendChild(childP1Tag);
    div.appendChild(childP2Tag);
    div.appendChild(childP3Tag);
    weatherCardElement.appendChild(div);
}

function removechildNode(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function getWwatherDataByLatLong() {
    lattitudeErrorElement.innerHTML = '';
    longitudeErrorElement.innerHTML = '';
    if(!lattitude.value || !validateLatLng(lattitude.value)) {
        lattitudeErrorElement.innerHTML = 'Please Enter Valid Lattitude';
        return;
    }
    if(!longitude.value || !validateLatLng(longitude.value)) {
        longitudeErrorElement.innerHTML = 'Please Enter Valid Longitude';
        return;
    }
    getWwatherData(lattitude.value, longitude.value);
}

function validateLatLng(val) {    
    let pattern = new RegExp('^-?([1-8]?[1-9]|[1-9]0)\\.{1}\\d{1,6}');
    return pattern.test(val);
}

function getWeatherTypeByCode(weatherCode) {
    switch (weatherCode) {
        case 0:
            return "Unknown";
        case 1000:
            return "Clear";
        case 1001:
            return "Cloudy";
        case 1100:
            return "Mostly Clear";
        case 1101:
            return "Partly Cloudy";
        case 1102:
            return "Mostly Cloudy";
        case 2000:
            return "Fog";
        case 2100:
            return "Light Fog";
        case 3000:
            return "Light Wind";
        case 3001:
            return "Wind";
        case 3002:
            return "Strong Wind";
        case 4000:
            return "Drizzle";
        case 4001:
            return "Rain";
        case 4200:
            return "Light Rain";
        case 4201:
            return "Heavy Rain";
        case 5000:
            return "Snow";
        case 5001:
            return "Flurries";
        case 5100:
            return "Light Snow";
        case 5101:
            return "Heavy Snow";
        case 6000:
            return "Freezing Drizzle";
        case 6001:
            return "Freezing Rain";
        case 6200:
            return "Light Freezing Rain";
        case 6201:
            return "Heavy Freezing Rain";
        case 7000:
            return "Ice Pellets";
        case 7101:
            return "Heavy Ice Pellets";
        case 7102:
            return "Light Ice Pellets";
        case 8000:
            return "Thunderstorm";
        default:
            return "cloudy";
    }
}

window.onload = function(){
    getWwatherData();
}

function loaderStart(){
    appElement[0].classList.add('opacity-blur');
    loaderElement[0].classList.remove('d-none');
    loaderElement[0].classList.add('d-block');
}

function loaderStop() {
    appElement[0].classList.remove('opacity-blur');
    loaderElement[0].classList.remove('d-block');
    loaderElement[0].classList.add('d-none');
}