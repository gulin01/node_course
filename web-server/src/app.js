const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// Define path for express config
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
// set up handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
// to read html/images/files assets from a pulic directory &set up static directory to serve
app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Gulchiroy",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Gulin",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpfull text...",
    title: "Help Page",
    name: "Gulin",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query?.address) {
    return res.send({ error: "Adress must be provided" });
  }
  geocode(
    req.query?.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(longitude, latitude, (error, forCastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          location,
          forCastData,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "You must provide search" });
  }

  res.send({ products: [] });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Gulchiroy",
    errorMessage: "Help Article not Found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Gulchiroy",
    errorMessage: "Page not Found",
  });
});

app.listen(5000, () => {
  console.log("Server is up on port 5000");
});
