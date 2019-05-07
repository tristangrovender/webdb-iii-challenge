exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("cohorts")
    .truncate() // resets primary key in addition to cleaning the table
    .then(function() {
      // Inserts seed entries
      return knex("cohorts").insert([
        { name: "WEB16" },
        { name: "WEB17" },
        { name: "WEB18" }
      ]);
    });
};
