exports.up = (knex) => {
  return knex.schema.createTable('messages_pass', (table) => {
    table.increments('id').primary();
    table.string('phone').notNullable();
    table.integer('code');
    table.datetime('date_validated', { precision: 6 });
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('messages_pass');
};
