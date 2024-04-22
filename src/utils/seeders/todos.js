const { dbConnection } = require("../db/connection");

const dbTodos = dbConnection.collection("lists");

async function seedTodos() {
  const data = [];
  const todos = [
    { subject: "Math", done: false },
    { subject: "Science", done: true },
  ];

  todos.forEach((todo) => {
    data.push(todo);
  });

  try {
    await dbTodos.insertMany(data);
  } catch (e) {
    console.log(`Error: ${e}`);
  } finally {
    console.log("done todos seeding");
  }
}

async function seed() {
  console.log("started todos seeding");
  await seedTodos();
}

seed();
