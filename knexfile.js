require('dotenv').config();
// const pg = require('pg');
const { knexSnakeCaseMappers } = require('objection');

// pg.defaults.ssl = true;

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    ...knexSnakeCaseMappers,
  },
};
