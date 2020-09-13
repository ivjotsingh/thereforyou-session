// expire the jwt token and break the code into modules

// require('express') will return a function express()
const express = require("express");

// function express() returns callback function which will be internally used by Node.Js
//to pass to functions to handle request and by convention we call that app
const app = express();

//To read from .env file
require("dotenv/config");

const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database!");
  })
  .catch((err) => {
    console.log(`Error while connecting to DB :${err}`);
  });

//Cross Origin resource sharing
const cors = require("cors");

// importing Auth routes
const authRoutes = require("./routes/auth");

// creating application-level middleware
app.use("/user", authRoutes);

// the payload in the put/post request will be automatically parsed as JSON
// express.json() returns a middleware which we use using app.use in request processing pipeline
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("I am root!");
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`listening to port ${port}...`));
