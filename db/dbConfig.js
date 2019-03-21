require('dotenv').load();

const dbEngine = process.env.NODE_ENV || 'development';

const config = require('../knexfile.js')[dbEngine];

module.exports = require('knex')(config);
