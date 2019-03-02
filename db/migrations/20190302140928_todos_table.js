exports.up = function(knex, Promise) {
  return knex.schema.createTable('todos', tbl => {
    tbl.increments();

    tbl.string('title').notNullable();
    tbl.string('createdAt').notNullable();
    tbl.string('description');
    tbl
      .string('user_uid')
      .references('uid')
      .inTable('users');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('todos');
};
