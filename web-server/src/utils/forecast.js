const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=1fe663932a77c34fc119f56ef6925e5e&query=${latitude},${longitude}&units=m`;

  request({ url, json: true }, (error, { body }) => {
    // low level error
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const message = `${body.current.weather_descriptions[0]} It is currently ${body.current.temperature} degrees out. It is feels like ${body.current.feelslike} deegrees out. The humidity is ${body.current.humidity}%`;
      callback(undefined, message);
    }
  });
};
module.exports = forecast;
