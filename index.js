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

app.get("/todos", async (req, res) => {
    try {
        const data = await todoCollection.find().sort({ _id: -1 }).toArray();
        return res.json(data);
    }catch(e) {
        return res.status(500).json({msg: e.message});
    }
});

app.post("/todos", async (req, res) => {
    const { list } = req.body;
    try {
        const result = await todoCollection.insertOne({ list, done: false });
        const data = await todoCollection.findOne({_id: new ObjectId(result.insertedId)});
        return res.json(data);
    }catch(e) {
        return res.status(500).json({msg: e.message});
    }
});

app.delete("/todos/:id", async (req, res) => {
    const { id } = req.params;
    const _id = new ObjectId(id);
    try {
        await todoCollection.deleteOne({ _id });
        return res.sendStatus(204);
    }catch(e) {
        return res.status(500).json({msg: e.message});
    }
});

app.listen(5000, () => {
    console.log('server running at port 5000.');
});