const request = require('request');

const geocode = (address, callback) => {
    const mapboxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiY2hjaGF2YW4iLCJhIjoiY2tteGIydWN5MG4yNzJ1bnYyYjRmcXFibiJ9.eDadyeSl_cH1YZl6OPIv8g&limit=1`;
    request({
        url: mapboxURL,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to mapbox geocoding services', undefined);
        } else if (response.body.features && response.body.features.length) {
            const geocodeInfo = response.body.features[0];
            callback(undefined, {
                latitude: geocodeInfo.center[1],
                longitude: geocodeInfo.center[0],
                location: geocodeInfo.place_name
            });
        } else {
            callback('Unable to find location. Try another search!', undefined)
        }
    })
}

module.exports = geocode;