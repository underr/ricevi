var config = require('./config');
var knex = require('knex')({
  client: config.CLIENT,
  ssl: config.SSL,
  connection: config.CONNECTION
});

knex.schema.hasTable('ricevi').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('ricevi', function(t) {
      t.increments('id').primary();
      t.string('ip', 39) // 39 chars because IPV6 IPs
      t.string('time', 100);
      t.string('data', config.CONTENT_LIMIT);
    });
  }
});

knex.schema.hasTable('privata').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('privata', function(t) {
      t.increments('id').primary();
      t.string('ip', 39) // 39 chars because IPV6 IPs
      t.string('secret', 60);
      t.string('time', 100);
      t.string('data', config.CONTENT_LIMIT);
    });
  }
});

knex.count('rowid')
  .table('ricevi')
  .then(function(rows) {
    if (rows[0]['count("rowid")'] === 0) {
      module.exports.total = 1
    } else {
      module.exports.total = rows[0]['count("rowid")']
    }
});
