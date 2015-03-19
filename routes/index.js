var express = require('express');
var config = require('../config');
var router = express.Router();
var knex = require('knex')({
  client: config.CLIENT,
  ssl: config.SSL,
  connection: config.CONNECTION
});
var total;

knex.count('rowid')
  .table('ricevi')
  .then(function(rows) {
    if (rows[0]['count("rowid")'] === 0) {
      total = 1
    } else {
      total = rows[0]['count("rowid")']
    }
});

router.get('/', function(req, res) {
  res.json({data: config.WELCOME, 'total items': total});
});

module.exports = router;
