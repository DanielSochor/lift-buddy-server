//creates database connection
var mysql = require('mysql');

var config = require('./config');

var connection = mysql.createConnection(config.mysql.url);

// if (process.env.JAWSDB_URL){
//   connection = mysql.createConnection(process.env.JAWSDB_URL);
  
// } else {
//   var connection= mysql.createConnection({
//       host: 'localhost',
//       port: 8809,
//       user: 'root',
//       password: 'root',
//       database: 'fitness_buddy'

//   });

// }; 

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;