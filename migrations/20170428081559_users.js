// Auto-generated from knex cli
// knex migrate:make users

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments(); // an incrementing ID
    table.string('username').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('timezone').notNullable();
    table.string('password_digest').notNullable();
    table.timestamps(); // creates 'created at' and 'updated at' fields
  });
};

// down is the reverse of what we are doing in up
// so, if we are creating a table in up
// we drop that same table in down
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};

// Run migration with the following command in cli:
// knex migrate:latest
