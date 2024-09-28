const express = require("express");
const mongoose = require("mongoose");

const app = express();

const connectionURL = "mongodb://localhost:27017/todoDB)";

mongoose
  .connect(connectionURL)
  .then(() => {
    console.log("Connection to mongoDB is successful!");
  })
  .catch((error) => {
    console.log(error.message);
  });

const port = 8000;
app.set("view engine", "ejs");

app.get("/", (req, res, next) => {
  try {
    res.render("index");
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
