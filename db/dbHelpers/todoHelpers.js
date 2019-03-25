const db = require('../dbConfig');

module.exports = {
  getTodosByUID: uid => {
    return db('todos')
      .where('user_uid', uid)
      .select('id', 'title', 'createdAt', 'description');
  },

  insertTodo: todo => {
    return db('todos').insert(todo, ['id']);
  },

  updateTodo: (id, data) => {
    return db('todos')
      .where('id', id)
      .update(data);
  },

  deleteTodos: ids => {
    return db('todos')
      .whereIn('id', ids)
      .del();
  },
};
