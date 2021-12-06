const request = require("request");

const forecast = (lattitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=113392ad223bc8b203b48c8c74200eb4&query=" +
    lattitude +
    "," +
    longitude

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to Weather services", undefined);
    } else if (response.body.error) {
      callback("Unable to find Location", undefined);
    } else {
      callback(
        undefined,
        response.body.current.weather_descriptions[0] +
          ". Current Temperature is " +
          response.body.current.temperature +
          " degress "
      );
    }
  });
};

module.exports = forecast;
