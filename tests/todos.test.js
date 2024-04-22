const request = require("supertest");
const app = require("../src/app");

describe("Todos Api Test", () => {
  let testId;

  test("It should response 200 status in GET method", async () => {
    const res = await request(app).get("/todos");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("It should add new data in POST method", async () => {
    const testData = { subject: "Workout", done: false };
    const res = await request(app).post("/todos").send(testData);

    testId = res.body._id;

    expect(res.statusCode).toBe(200);
    expect(res.body.subject).toBe(testData.subject);
    expect(res.body.done).toBe(testData.done);
  });

  test("It should replace update data in PUT method", async () => {
    const testData = { subject: "Fuck" };
    const res = await request(app).put(`/todos/${testId}`).send(testData);

    expect(res.statusCode).toBe(200);
    expect(res.body.subject).toBe(testData.subject);
  });

  test("It should delete and return 204 status in DELETE method", async () => {
    const res = await request(app).delete(`/todos/${testId}`);
    expect(res.statusCode).toBe(204);
  });
});
