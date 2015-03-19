var app = require('express')();
var config = require('./config');
if (config.LOGS)
  var morgan = require('morgan');
var bodyParser = require('body-parser');
var knex = require('knex')({
  client: config.CLIENT,
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

if (config.LOGS)
  app.use(morgan('short'));
app.enable('trust proxy');
app.set('json spaces', config.JSON_SPACING);
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next) { // CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', require('./routes/index'));
app.use('/ricevi', require('./routes/ricevi'));
app.use('/sendi', require('./routes/sendi'));

app.use(function(req, res, next){
  res.status(404).json({'status': '404'});
});

app.listen(config.PORT);
console.log('* Running on http://locahost:' + config.PORT + ' (Press CTRL+C to quit)');