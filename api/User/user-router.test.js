const request = require("supertest");
const server = require("../server");
const db = require("../../data/db-config");

test("environment is testing", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});
beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

describe("[get] router getting users", () => {
  test("getting all users", async () => {
    const res = await request(server).get("/api/users");
    expect(res.body).toHaveLength(2);
    expect(res.status).toBe(200);
  });
  test("get user by its id", async () => {
    const res = await request(server).get("/api/users/1");
    expect(res.body).toMatchObject({
      id: 1,
      username: "admin",
      password: "123",
    });
    expect(res.status).toBe(200);
  });
});
describe("[post] router creating users", () => {
  const newUser = { username: "noel", password: "coolCat" };
  test("router responds with newly created user", async () => {
    const res = await request(server).post("/api/users").send(newUser);
    expect(res.body).toMatchObject(newUser);
    expect(res.status).toBe(201);
  });
  test("new user is added to the users table", async () => {
    await request(server).post("/api/users").send(newUser);
    expect(await db("users")).toHaveLength(3);
  });
});
