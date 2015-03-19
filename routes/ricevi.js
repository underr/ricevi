var express = require('express');
var router = express.Router();
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./data.db"
  }
});

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

router.get('/', function(req, res) {
  knex.select('id','time','data')
    .from('ricevi')
    .orderByRaw('rowid DESC')
    .then(function(rows) {
      res.json(rows);
    })
    .catch(function(error) {
      console.error(error);
      res.json({'info': 'Error when requesting'});
    });
});

router.get('/id/:id', function(req, res) {
  knex.select('id','time','data')
    .from('ricevi')
    .where('id', '=', req.params.id)
    .then(function(rows) {
      var rdata = {
        'time': rows[0].time,
        'data': rows[0].data
      }
      res.json(rdata);
    })
    .catch(function(error) {
      console.error(error);
      res.json({'info': 'Error when requesting'});
    });
});

var total; // bad practice, I know

router.get('/random', function(req, res) {
  knex.count('rowid')
    .table('ricevi')
    .then(function(rows) {
      if (rows[0]['count("rowid")'] === 0) {
        total = 1
      } else {
        total = rows[0]['count("rowid")']
      }
    });

  knex.select('id','time', 'data')
    .from('ricevi')
    .where('id', '=', randomInt(1, total))
    .then(function(rows) {
      var rdata = {
        'time': rows[0].time,
        'data': rows[0].data
      }
      res.json(rdata);
    })
    .catch(function(error) {
      console.error(error);
      res.json({'info': 'Error when requesting'});
    });
});

module.exports = router;
