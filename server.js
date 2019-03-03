const express = require('express');
const server = express();
const cors = require('cors');
const admin = require('firebase-admin');
const dbConfig = require('./knexfile.js');
const knex = require('knex');
const db = knex(dbConfig.development);
const dotenv = require('dotenv');
dotenv.load();
const todosRouter = require('./todos-router/todos-router.js');

server.use(express.json());
server.use(cors());

admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url:
      process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  }),
});

// Middleware function to verify Firebase token
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
  const { uid, email } = req.body;
  const user = {
    email,
  };

  try {
    const data = await db('users').where('uid', uid);

    if (data) {
      res.status(200).json(data);
    } else {
      const id = await db('users').insert(user);

      if (id) {
        res.status(201).json(id);
      }

      res.status(500).json({ error: 'Error verifying registration' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error verifying registration' });
  }
});

module.exports = server;
