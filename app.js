const express = require("express");
const flash = require("connect-flash");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");

// init app
const app = express();

// static files
app.use(express.static(path.join(__dirname, "public")));
// session middleware
app.use(
  session({ secret: "123__345__bom", resave: false, saveUninitialized: true })
);
// flash middleware
app.use(flash());

const todoRoutes = require("./routes/todoRoutes");
// view engine
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true })); // to parse the form data
app.use("/", todoRoutes);
module.exports = app;
