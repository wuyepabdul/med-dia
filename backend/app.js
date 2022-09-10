const express = require("express");
const dotenv = require("dotenv");
const dbConnection = require("./config/connection.js");
const diagnosisRoute = require("./routes/diagnosisRoute.js");
const morgan = require("morgan");

dotenv.config();

const app = express();

dbConnection();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api", diagnosisRoute);


module.exports = app;
