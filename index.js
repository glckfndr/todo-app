const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "public")));

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
    res.render("index", { title: "Todo List" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/add-todo", (req, res, next) => {
  try {
    res.render("newTodo", { title: "Add Todo" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/update-todo", (req, res, next) => {
  try {
    res.render("updateTodo", { title: "Edit Todo" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/delete-todo", (req, res, next) => {
  try {
    res.render("deleteTodo", { title: "Delete Todo" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
