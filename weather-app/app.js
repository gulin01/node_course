const request = require("request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const address = process.argv[2];

if (address) {
  geocode(address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return console.log(error);
    }

    forecast(longitude, latitude, (error, forCastData) => {
      if (error) {
        return console.log("Error", error);
      }

      console.log(location);
      console.log(forCastData);
    });
  });
} else {
  console.log("please provide the address");
}
