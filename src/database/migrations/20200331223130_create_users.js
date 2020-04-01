exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('phone').notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('users');
};
