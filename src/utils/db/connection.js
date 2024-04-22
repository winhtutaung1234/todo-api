require("dotenv").config();

const { MongoClient } = require("mongodb");
const mongo = new MongoClient(process.env.MONGO_HOST);
const db = mongo.db("todos");

module.exports = { dbConnection: db };
