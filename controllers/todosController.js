const moment = require("moment");
const ToDo = require("../models/todo");

const index = async (req, res, next) => {
  try {
    const todos = await ToDo.find({}).sort({ createdAt: -1 });
    res.locals.moment = moment;
    res.render("index", { title: "Todo List", todos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const edit = (req, res, next) => {
  try {
    res.render("newTodo", { title: "Add Todo" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res, next) => {
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
};

const update = (req, res, next) => {
  try {
    res.render("updateTodo", { title: "Edit Todo" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteItem = (req, res, next) => {
  try {
    res.render("deleteTodo", { title: "Delete Todo" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const todosController = { index, create, edit, update, deleteItem };
module.exports = todosController;
