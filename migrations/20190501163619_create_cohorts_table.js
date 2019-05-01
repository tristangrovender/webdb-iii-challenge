exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', tbl => {
    // each table needs a primary key
    // we'll call it id, integer, auto-increment
    tbl.increments();

    tbl
      .string('name', 128)
      .notNullable()
      .unique();

    tbl.timestamps(true, true); // create_at and updated_at
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts');
};
