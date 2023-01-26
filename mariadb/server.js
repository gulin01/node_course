const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const userRouter = require("./routes/user");
require("./src/bootstrap")();
const PORT = process.env.EXPRESS_SERVER_HOST || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// DB connection
require("./src/database/connection");
app.get("/", (req, res) => {
  res.status(200).send("Head to /user/:id with your userId");
});
app.use("/user", userRouter);

app.listen(PORT, () => console.log(PORT));
