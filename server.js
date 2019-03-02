const express = require('express');
const server = express();
const todosRouter = require('./todos-router/todos-router.js');

server.use(express.json());
server.use('/api', todosRouter);

server.get('/', (req, res) => {
  res.status(200).send('Hello Yaro!');
});

module.exports = server;
