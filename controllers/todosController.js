const moment = require("moment");
const ToDo = require("../models/todo");

const index = async (req, res, next) => {
  try {
    const todos = await ToDo.find({}).sort({ createdAt: -1 });
    res.locals.moment = moment;
    res.render("index", { title: "Todo List", todos, messages: req.flash() });
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

const deletePage = (req, res, next) => {
  try {
    const { id } = req.query;
    res.render("deleteTodo", { title: "Delete Todo", id: id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteToDo = async (req, res, next) => {
  try {
    const { confirm } = req.query;
    if (confirm === "yes") {
      const { id } = req.query;
      await ToDo.findByIdAndDelete(id);
      req.flash("success", "ToDo deleted successfully");
      res.redirect("/");
    } else {
      req.flash("success", "Can't delete ToDo");
      res.redirect("/");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const todosController = { index, create, edit, update, deletePage, deleteToDo };
module.exports = todosController;
