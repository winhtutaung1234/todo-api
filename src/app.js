const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const { todosRouter } = require("./routes/todos");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(todosRouter);

module.exports = app;
