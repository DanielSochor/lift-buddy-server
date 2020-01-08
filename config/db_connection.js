//creates database connection
//var mysql = require('mysql');

//var config = require('./config');

//var connection = mysql.createConnection(config.mysql.url);

// var connection = '';

// if (process.env.JAWSDB_URL) {
//   connection = mysql.createConnection(process.env.JAWSDB_URL);
// } else {
//   connection = mysql.createConnection({
//     // Adding these process.env variables appears to work
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE
//     //host: 'localhost',
//     //port: 8889,
//     //user: 'root',
//     //password: 'root',
//     //database: 'fitness_buddy'
//   });
// };

// connection.connect(function (err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }
//   console.log("connected as id " + connection.threadId);
// });

// module.exports = connection;

var mysql = require("mysql");
var config = require('./config');

var connection = '';

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection(process.env.DB_URL);
    //    connection = mysql.createConnection({
    //        host: 'localhost',
    //        user: 'root',
    //        password: 'root',
    //        database: 'lift_buddy',
    //        port: 8889,
    //    }); 
};

//var connection = mysql.createConnection(config);
connection.connect(function (error) {
    if (error) throw error;
    console.log("connected to database on " + connection.config.host + " as "
        + connection.config.user + "@" + connection.config.database);
});

module.exports = connection;