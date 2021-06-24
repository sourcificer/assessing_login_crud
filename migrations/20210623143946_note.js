// eslint-disable-next-line func-names
exports.up = function (knex) {
  return knex.schema.createTable('notes', (table) => {
    table.increments();
    table.string('content');
    table.timestamps();
  });
};

// eslint-disable-next-line func-names
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('notes');
};
