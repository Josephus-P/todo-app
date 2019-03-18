require('dotenv').load();

const dbEngine =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';
const config = require('../knexfile.js')[dbEngine];

module.exports = require('knex')(config);
