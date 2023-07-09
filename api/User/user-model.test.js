const User = require("./user-model");
const db = require("../../data/db-config");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

test("environment is testing", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

describe("get users", () => {
  test("receives all the users in the table", async () => {
    const result = await User.getAll();
    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({
      id: 1,
      username: "admin",
      password: "123",
    });
  });
  test("receives user by that specific id", async () => {
    const result = await User.getById(2);
    expect(result).toMatchObject({
      id: 2,
      username: "albert",
      password: "123",
    });
  });
});

describe("adding users", () => {
  const newUser = { username: "lucky", password: "coolCat" };
  test("resolves the newly created user", async () => {
    const result = await User.insert(newUser);
    expect(result).toMatchObject(newUser);
  });
  test("add the user to the users table", async () => {
    await User.insert(newUser);
    const allUsers = await db("users");
    expect(allUsers).toHaveLength(3);
  });
});
