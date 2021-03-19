
const APIKEY = '9nu9eAW5lFwoIlnZqvfk6VvW7L8SYcbt';

function getCurrentWeather(lat = '-73.98529171943665', lang = '40.75872069597532') {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open('GET', `https://data.climacell.co/v4/timelines?location=${lat},${lang}&fields=temperature,weatherCode,windSpeed&timesteps=1d&units=metric&apikey=${APIKEY}`)
    
        request.send();
    
        request.onload = () => {
            console.log(request)
    
            if(request.status === 200) {
                console.log(JSON.parse(request.response));
                resolve(JSON.parse(request.response))
            } else {
                console.log(`error while get weather data ${request.statusText}`)
                reject(`error while get weather data ${request.statusText}`)
            }
        }
    })
}