const db = require("../../data/db-config");

async function getAll() {
  const result = await db("users");
  return result;
}

async function getById(id) {
  const result = await db("users").where("id", id).first();
  return result;
}

function insert(newUser) {
  return db("users")
    .insert(newUser)
    .then(([result]) => {
      return db("users").where("id", result).first();
    });
}

module.exports = {
  getAll,
  getById,
  insert,
};
