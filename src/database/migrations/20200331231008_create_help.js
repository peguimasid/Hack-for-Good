exports.up = (knex) => {
  return knex.schema.createTable('help', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.integer('latitude').notNullable();
    table.integer('longitude').notNullable();
    table.integer('user_id').notNullable();

    table.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('help');
};
