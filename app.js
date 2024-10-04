const express = require("express");
const flash = require("connect-flash");
const session = require("express-session");

const path = require("path");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({ secret: "123__345__bom", resave: false, saveUninitialized: true })
);
app.use(flash());

const todoRoutes = require("./routes/todoRoutes");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true })); // to parse the form data
app.use("/", todoRoutes);
module.exports = app;
