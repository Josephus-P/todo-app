exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments();

    tbl
      .string('uid')
      .notNullable()
      .unique('uid');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
