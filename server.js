const express = require('express');
const server = express();
const cors = require('cors');
const admin = require('./firebase-admin/admin');
const db = require('./db/dbConfig');
const todosRouter = require('./todos-router/todos-router.js');
require('dotenv').load();

server.use(express.json());
server.use(cors());

// Middleware function to verify Firebase token
// Adds the user's UID to the request body
async function verifyToken(req, res, next) {
  const idToken = req.headers.authorization;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    if (decodedToken) {
      req.body.uid = decodedToken.uid;

      return next();
    } else {
      return res.status(401).send('You are not authorized!');
    }
  } catch (e) {
    return res.status(401).send('You are not authorized!');
  }
}

server.use('/', verifyToken);
server.use('/api', todosRouter);

server.get('/', (req, res) => {
  res.status(200).send('Hello Yaro!');
});

// Check if the user exists in the DB. If not, insert the user
server.post('/verifyregistration', async (req, res) => {
  const { uid } = req.body;
  const user = {
    uid,
  };

  try {
    const data = await db('users').where('uid', uid);

    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      const id = await db('users').insert(user);

      if (id) {
        res.status(201).json(id);
      }

      res.status(500).json({ error: 'Error verifying registration' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error verifying registration' });
  }
});

module.exports = server;
