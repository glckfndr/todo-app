const express = require("express");
const router = express.Router();

const todosController = require("../controllers/todosController");

router.get("/", todosController.index);

router.get("/todos/add-todo", todosController.newPage);

router.post("/todos/add-todo", todosController.create);

router.get("/todos/update-todo", todosController.updatePage);
router.post("/todos/update-todo/:id", todosController.updateToDo);

router.get("/todos/delete-todo", todosController.deletePage);

router.get("/todos/confirm-delete", todosController.deleteToDo);

module.exports = router;
