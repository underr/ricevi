var express = require('express');
var router = express.Router();
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./data.db"
  }
});

router.post('/', function(req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var date = new Date().toISOString()
  if (req.body.data) {
    knex('ricevi').insert({
      ip: ip,
      time: date,
      data: req.body.data
    })
      .then(function(rows) {
        var data = {
          'status':'sent',
           'id': rows[0]
        }
        res.json(data);
      })
      .catch(function(error) {
        console.error(error);
        res.json({'status': 'error'});
      });
    } else {
      res.json({'status': 'error'});
    }
});

module.exports = router;
