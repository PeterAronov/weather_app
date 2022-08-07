const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0483b1ca91959f08482cec4c8eeff76b&query=' + latitude + ',' + longitude + '&units=m';

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services', undefined);
        } else if (response.body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, {
                locationFull: response.body.location,
                weatherData: response.body.current.weather_descriptions + ". It is currently " + response.body.current.temperature + " degrees out. It feels like " + response.body.current.feelslike + " degrees out."
        })
    }
    })
}

module.exports = forecast;