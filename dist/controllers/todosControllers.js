const { ObjectId } = require("mongodb");
const {
  getAllLists,
  createList,
  updateList,
  deleteList
} = require("../models/todos");

async function getTodos(req, res) {
  try {
    const data = await getAllLists();
    return res.json(data);
  } catch (e) {
    return res.status(500).json({
      msg: e.message
    });
  }
}

async function createTodo(req, res) {
  try {
    const data = await createList(req.body);
    return res.json(data);
  } catch (e) {
    return res.status(500).json({
      msg: e.message
    });
  }
}

async function updateTodo(req, res) {
  try {
    const { id } = req.params;
    const _id = new ObjectId(id);
    const data = await updateList(_id, req.body);
    return res.json(data);
  } catch (e) {
    return res.status(500).json({
      msg: e.message
    });
  }
}

async function deleteTodo(req, res) {
  try {
    const { id } = req.params;
    const _id = new ObjectId(id);
    const data = await deleteList(_id);
    return res.sendStatus(204);
  } catch (e) {
    return res.status(500).json({
      msg: e.message
    });
  }
}

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };