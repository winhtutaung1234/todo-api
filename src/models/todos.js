const { dbConnection } = require("../utils/db/connection");

const dbLists = dbConnection.collection("lists");

async function getAllLists() {
  const data = dbLists.find().toArray();
  return data;
}

async function createList(body) {
  const { subject } = body;
  const result = await dbLists.insertOne({ subject, done: false });
  const data = await dbLists.findOne(result.insertedId);
  return data;
}

async function updateList(_id, body) {
  try {
    const result = await dbLists.findOneAndUpdate(
      { _id },
      { $set: body },
      { returnDocument: "after" }
    );

    if (!result) throw new Error("article not found");

    return result;
  } catch (e) {
    throw new Error(e.message);
  }
}

async function deleteList(_id) {
  const result = await dbLists.deleteOne({ _id });

  return result;
}
module.exports = { getAllLists, createList, updateList, deleteList };
