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


async function getWwatherData(lat = '-73.98529171943665', lang = '40.75872069597532') {
    removechildNode(weatherCardElement);
    // const weatherDataResp = await getCurrentWeather(lat, lang);
    const weatherDataResp = {"data":{"timelines":[{"timestep":"1d","startTime":"2021-03-19T03:00:00Z","endTime":"2021-04-02T03:00:00Z","intervals":[{"startTime":"2021-03-19T03:00:00Z","values":{"temperature":-35.69,"weatherCode":5001,"windSpeed":5.67}},{"startTime":"2021-03-20T03:00:00Z","values":{"temperature":-38.37,"weatherCode":1001,"windSpeed":8.65}},{"startTime":"2021-03-21T03:00:00Z","values":{"temperature":-42.11,"weatherCode":1102,"windSpeed":11.02}},{"startTime":"2021-03-22T03:00:00Z","values":{"temperature":-41.11,"weatherCode":1101,"windSpeed":11.24}},{"startTime":"2021-03-23T03:00:00Z","values":{"temperature":-39.63,"weatherCode":1102,"windSpeed":6.94}},{"startTime":"2021-03-24T03:00:00Z","values":{"temperature":-42.51,"weatherCode":1100,"windSpeed":7.2}},{"startTime":"2021-03-25T03:00:00Z","values":{"temperature":-40.86,"weatherCode":1102,"windSpeed":7.26}},{"startTime":"2021-03-26T03:00:00Z","values":{"temperature":-38.15,"weatherCode":1102,"windSpeed":7.13}},{"startTime":"2021-03-27T03:00:00Z","values":{"temperature":-36.76,"weatherCode":2100,"windSpeed":7.54}},{"startTime":"2021-03-28T03:00:00Z","values":{"temperature":-34.97,"weatherCode":5001,"windSpeed":7.05}},{"startTime":"2021-03-29T03:00:00Z","values":{"temperature":-26.08,"weatherCode":5001,"windSpeed":10.81}},{"startTime":"2021-03-30T03:00:00Z","values":{"temperature":-26.43,"weatherCode":5001,"windSpeed":7.14}},{"startTime":"2021-03-31T03:00:00Z","values":{"temperature":-36.34,"weatherCode":1102,"windSpeed":6.36}},{"startTime":"2021-04-01T03:00:00Z","values":{"temperature":-34.02,"weatherCode":2100,"windSpeed":6.56}},{"startTime":"2021-04-02T03:00:00Z","values":{"temperature":-36.52,"weatherCode":5001,"windSpeed":6.78}}]}]}};
    weatherData = weatherDataResp;
    if(weatherDataResp && weatherDataResp.data && weatherDataResp.data.timelines && weatherDataResp.data.timelines.length > 0) {
        weatherDataResp.data.timelines[0].intervals.forEach((v, index) => {
            if(index < 7) {
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