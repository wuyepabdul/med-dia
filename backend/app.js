const express = require("express");
const dotenv = require("dotenv");
const dbConnection = require("./config/connection.js");
const path = require("path");
const authRoute = require("./routes/authRoute.js");
const staffRoutes = require("./routes/staffRoutes.js");
const morgan = require("morgan");

dotenv.config();

const app = express();

dbConnection();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/auth", authRoute);
app.use("/api/staff", staffRoutes);

// const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    try {
      // res.send("Api is running...");
    res.end('hello world');
    console.log('do something')
    setTimeout(() => {
      function async(arg){
        console.log('log after 1 sec', arg)
      }
    }, 1000);
    } catch (error) {
      console.log('error')
    }
  });
}

module.exports = app;
