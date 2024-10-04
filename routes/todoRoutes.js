const express = require("express");
const router = express.Router();

const todosController = require("../controllers/todosController");

router.get("/", todosController.index);

router.get("/add-todo", todosController.edit);

router.post("/add-todo", todosController.create);

router.get("/update-todo", todosController.update);

router.get("/delete-todo", todosController.deletePage);

router.get("/confirm-delete", todosController.deleteToDo);

module.exports = router;
