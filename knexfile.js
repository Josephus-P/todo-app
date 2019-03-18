require('dotenv').config();

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/todo.sqlite3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './db/migrations',
    },
    useNullAsDefault: true,
  },
};
