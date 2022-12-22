const express = require("express");
const path = require("path");

const app = express();
// going into public directory
const publicDir = path.join(__dirname, "../public");

// to read html/images/files assets from a pulic directory
app.use(express.static(publicDir));

app.get("/weather", (req, res) => {
  res.send({
    forcast: "its snowing",
    location: "Seoulm South Korea",
  });
});

app.listen(5000, () => {
  console.log("Server is up on port 5000");
});
