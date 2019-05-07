
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'TA', cohort_id:1},
        {name: 'Student', cohort_id:2},
        {name: 'Staff', cohort_id:3}
      ]);
    });
};
