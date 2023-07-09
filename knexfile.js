// Update with your config settings.
const common = {
  useNullAsDefault: true,
  pool: {
    afterCreate: (conn, done) => conn.run("PRAGMA foreign_keys = ON", done),
  },
  client: "sqlite3",
  migrations: {
    directory: "./data/migrations",
  },
  seeds: {
    directory: "./data/seeds",
  },
};
module.exports = {
  development: {
    ...common,
    connection: {
      filename: "./data/users-data.db3",
    },
  },

  testing: {
    ...common,
    connection: {
      filename: "./data/test.db3",
    },
  },

  production: {},
};
