const express = require('express');
const router = express.Router();
const dbConfig = require('../knexfile.js');
const knex = require('knex');
const db = knex(dbConfig.development);

module.exports = router;
