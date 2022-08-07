const request = require('request');

const gecdoe = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGV0ZXJhcm9ub3YiLCJhIjoiY2w2Mnc5dnFlMDE2azNpbjhxbHZ1eG5qNSJ9.6TJ1ejo5dtjPUNSNfOVnqA&limit=1';

    request({ url: url, json: true }, (error, {body: bodyResponse}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (bodyResponse.features.length === 0) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, {
                latitude: bodyResponse.features[0].center[1],
                longitude: bodyResponse.features[0].center[0],
                location: bodyResponse.features[0].place_name
            });
        }
    });
}

module.exports = gecdoe;