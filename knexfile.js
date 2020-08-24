const pgConnection = process.env.DATABASE_URL || "postgres://zuoifpwfterqlc:27fc46b4f4eb4eab400bc2e10c919c4e60694d9e37b86548f7aa8e949931337d@ec2-54-146-4-66.compute-1.amazonaws.com:5432/db5oa2qve0d66a";

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./database/auth.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },
  testing: {
    client: "sqlite3",
    connection: {
      filename: "./database/test.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },

  production: {
    client: "pg",
    connection: pgConnection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },
};
