exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('todos')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('todos').insert([
        {
          id: 1,
          title: 'My first todo',
          user_uid: 'rowValue1',
          createdAt: '3/19/19',
          description: 'This is my first todo',
        },
        {
          id: 2,
          title: 'My second todo',
          user_uid: 'rowValue2',
          createdAt: '3/20/19',
          description: 'This is my second todo',
        },
        {
          id: 3,
          title: 'My third todo',
          user_uid: 'rowValue3',
          createdAt: '3/21/19',
          description: 'This is my third todo',
        },
        {
          id: 4,
          title: 'My final todo',
          user_uid: 'test-uid',
          createdAt: '3/21/19',
          description: 'This is my final todo',
        },
      ]);
    });
};
