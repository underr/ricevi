var config = {
  // Refer to http://knexjs.org to configure other DB System
  CONNECTION: {filename: "./data.db"},
  CLIENT: 'sqlite3',
  CONTENT_LIMIT: 50000000,
  PORT: 5000,
  LOGS: true,
  JSON_SPACING: 10, // set to 0 to disable completly
  WELCOME: "Hey there. You can receive things at /ricevi   and send at /sendi. Enjoy!"
}

module.exports = config;
