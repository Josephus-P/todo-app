const knex = require('../db/dbConfig');

describe('Todos', () => {
  before(done => {
    // run migrations
    knex.migrate
      .latest()
      .then(() => {
        // run seeds
        return knex.seed.run();
      })
      .then(() => done());
  });

  it('It works...', () => {
    console.log('Its working!');
  });
});
