exports.up = function (knex) {
  return knex.schema.createTable('news', function (table) {
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.string('url').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('news');
};
