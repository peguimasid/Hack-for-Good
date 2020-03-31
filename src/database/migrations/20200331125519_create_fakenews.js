exports.up = function (knex) {
  return knex.schema.createTable('fake_news', function (table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.string('url').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('fake_news');
};
