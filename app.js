const express = require("express");

const path = require("path");
const bodyParser = require("body-parser");
const { emit } = require("nodemon");

const app = express();
app.use(express.static(path.join(__dirname, "public")));

const todoRoutes = require("./routes/todoRoutes");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true })); // to parse the form data
app.use("/", todoRoutes);
module.exports = app;
