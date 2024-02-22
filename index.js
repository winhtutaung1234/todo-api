const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient("mongodb://localhost");
const db = client.db("my-projects");
const todoCollection = db.collection("todo");

app.get("/lists", async (req, res) => {
    try {
        const data = await todoCollection.find().toArray();
        return res.json(data);
    }catch(e) {
        return res.status(500).json({msg: e.message});
    }
});