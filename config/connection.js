//creates database connection
var mysql = require('mysql');

var config = require('./config');

var connection = mysql.createConnection(config.mysql.url); 

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;