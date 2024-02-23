const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

const {
    body,
    param,
    validationResult,
} = require("express-validator");

const { MongoClient, ObjectId } = require("mongodb");
const e = require("express");
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

app.post("/todos", 
[
    body("list").notEmpty(),
],
async (req, res) => {
    const err = validationResult(req);
    if(!err.isEmpty()) {
        return res.status(400).json({err: err.array()});
    }
    const { list } = req.body;
    try {
        const result = await todoCollection.insertOne({ list, done: false });
        const data = await todoCollection.findOne({_id: new ObjectId(result.insertedId)});
        return res.json(data);
    }catch(e) {
        return res.status(500).json({msg: e.message});
    }
});

app.delete("/todos/:id", 
[
    param("id").notEmpty().isMongoId(),
],
async (req, res) => {
    const err = validationResult(req);
    if(!err.isEmpty()) {
        return res.status(400).json({err: err.array()});
    }

    const { id } = req.params;
    const _id = new ObjectId(id);
    try {
        await todoCollection.deleteOne({ _id });
        return res.sendStatus(204);
    }catch(e) {
        return res.status(500).json({msg: e.message});
    }
});

app.delete("/todos", async (req, res) => {
    try {
        const result = await todoCollection.deleteMany({ done: true });
        return res.sendStatus(204);
    }catch(e) {
        return res.status(500).json({msg: e});
    }
});

app.put("/todos/toggle/:id", 
[
    param("id").notEmpty().isMongoId(),
],
async (req, res) => {
    const err = validationResult(req);
    if(!err.isEmpty()) {
        return res.status(400).json({err: err.array()});
    }

    const { id } = req.params;
    const _id = new ObjectId(id);

    try {
        const current = await todoCollection.findOne({ _id });
        const done = !current.done;
        const result = await todoCollection.updateOne(
            { _id },
            {
                $set: { done },
            }
        );

        const data = await todoCollection.findOne({ _id });
        return res.json(data);
    }catch(e) {
        return res.status(500).json({msg: e.message});
    }

});

app.put("/todos/:id", 
[
    param("id").notEmpty().isMongoId(),
    body("list").notEmpty(),
],
async (req, res) => {
    const err = validationResult(req);
    if(!err.isEmpty()) {
        return res.status(400).json({err: err.array()});
    }
    const { id } = req.params;
    const _id = new ObjectId(id);
    const { list } = req.body;

    try {
        const result = await todoCollection.updateOne(
            { _id },
            {
                $set: { list }
            },
        );

        const data = await todoCollection.findOne({ _id });
        return res.json(data);
    }catch (e) {
        return res.status(500).json({msg: e.message});
    }
});

app.listen(5000, () => {
    console.log('server running at port 5000.');
});