exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, uid: 'rowValue1' },
        { id: 2, uid: 'rowValue2' },
        { id: 3, uid: 'rowValue3' },
        { id: 4, uid: 'test-uid' },
      ]);
    });
};
