const http = require("http");
const url = `http://api.weatherstack.com/current?access_key=1fe663932a77c34fc119f56ef6925e5e&query=40,-75&units=m`;

const request = http.request(url, (response) => {
  let data = "";

  response.on("data", (chunk) => {
    data = data + chunk.toString();
  });
  response.on("end", () => {
    const body = JSON.parse(data);
    console.log(body);
  });
});

request.on("error", (error) => {
  console.log(error);
});
request.end();
