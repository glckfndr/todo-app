const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const { emit } = require("nodemon");

const app = express();
app.use(express.static(path.join(__dirname, "public")));

const connectionURL = "mongodb://localhost:27017/todoDB";

mongoose
  .connect(connectionURL)
  .then(() => {
    console.log("Connection to mongoDB is successful!");
  })
  .catch((error) => {
    console.log(error.message);
  });

const toDoSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

const ToDo = mongoose.model("todo", toDoSchema);

const port = 8000;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true })); // to parse the form data

app.get("/", async (req, res, next) => {
  try {
    const todos = await ToDo.find({}).sort({ createdAt: -1 });
    res.render("index", { title: "Todo List", todos });
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

app.post("/add-todo", async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTodo = new ToDo({
      title,
      description,
    });
    await newTodo.save();
    res.redirect("/");
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
