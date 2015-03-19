var express = require('express');
var config = require('../config');
var db = require('../db');
var router = express.Router();

router.get('/', function(req, res) {
  res.json({data: config.WELCOME, 'total items': db.total});
});

module.exports = router;
