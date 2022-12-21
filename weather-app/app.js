const request = require("request");

const url =
  "http://api.weatherstack.com/current?access_key=1fe663932a77c34fc119f56ef6925e5e&query=37.8267,-122.4233";

request({ url, json: true }, (error, response) => {
  console.log(response.body.current);
});
