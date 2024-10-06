const moment = require("moment");
// add model to controller
const ToDo = require("../models/todo");

const index = async (req, res, next) => {
  try {
    const todos = await ToDo.find({}).sort({ createdAt: -1 });
    // add moment to locals
    res.locals.moment = moment;
    // render the index page with todos
    res.render("todos/index", {
      title: "Todo List",
      todos,
      messages: req.flash(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const newPage = (req, res, next) => {
  try {
    // render the newTodo page
    res.render("todos/newTodo", { title: "Add Todo" });
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
    // create a new todo
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

const updatePage = async (req, res, next) => {
  try {
    const { id } = req.query;
    const todo = await ToDo.findById(id);
    // render the updateTodo page with the todo
    res.render("todos/updateTodo", {
      title: todo.title,
      description: todo.description,
      id: id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateToDo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const todo = await ToDo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    todo.title = title;
    todo.description = description;
    await todo.save();
    res.redirect("/");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePage = (req, res, next) => {
  try {
    const { id } = req.query;
    // render the deleteTodo page with the todo id
    res.render("todos/deleteTodo", { title: "Delete Todo", id: id });
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
      res.redirect("/");
    }
  } catch (error) {
    req.flash("error: ", "Can't delete ToDo");
    res.redirect("/");
  }
};
const todosController = {
  index,
  create,
  newPage,
  updatePage,
  deletePage,
  deleteToDo,
  updateToDo,
};
module.exports = todosController;
