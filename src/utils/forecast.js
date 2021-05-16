const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const weatherstackURL = `http://api.weatherstack.com/current?access_key=006b90f7eb7044502b460dbc0c3330ff&query=${latitude},${longitude}`;
    request({
        url: weatherstackURL,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback('Unable to connect to weather stack api', undefined);
        } else if (body.error) {
            callback('Unable to get weather', undefined);
        } else {
            const data = body.current;
            callback(undefined, `${data.weather_descriptions}. The temperature is ${data.temperature} degrees celcius, but it feels like ${data.feelslike} degree celcius`);
        }
    })
}

module.exports = forecast;