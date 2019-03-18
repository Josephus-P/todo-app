const express = require('express');
const router = express.Router();
const db = require('../db/dbConfig');

// Return all todos for a user
router.get('/users/todos', async (req, res) => {
  const { uid } = req.body;

  try {
    const todos = await db('todos')
      .where('user_uid', uid)
      .select('id', 'title', 'createdAt', 'description');

    if (todos) {
      res.status(200).json(todos);
    } else {
      res.status(500).json({ error: 'No todos were found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error retrieving todos' });
  }
});

// Insert a new todo into the DB
router.post('/todos', async (req, res) => {
  const { uid, title, createdAt, description } = req.body;
  const todo = {
    title,
    createdAt,
    description,
    user_uid: uid,
  };

  try {
    const id = await db('todos').insert(todo, ['id']);

    if (id) {
      res.status(201).json(id);
    } else {
      res.status(500).json({ error: "Couldn't add the todo" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error adding the todo' });
  }
});

// Update a specified todo
router.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const data = await db('todos')
      .where('id', id)
      .update({ title, description });

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(500).json({ error: 'Todo not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error editting the todo' });
  }
});

// Delete a specified todo
router.delete('/todos', async (req, res) => {
  const { checked } = req.body;

  try {
    const data = await db('todos')
      .whereIn('id', checked)
      .del();

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(500).json({ error: 'Todo not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error deleting the todo' });
  }
});

module.exports = router;
