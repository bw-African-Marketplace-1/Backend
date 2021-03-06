const cleaner = require("knex-cleaner")
exports.seed = function(knex) {
  return cleaner.clean(knex, {
    mode: "truncate",
    ignoreTables: ["knex_migrations", "knex_migrations_lock"]
  })
  .then(() => console.log(`All tables have been truncated, ready to seed`))
};