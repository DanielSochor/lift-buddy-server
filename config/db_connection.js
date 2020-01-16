var mysql = require("mysql");
// var config = require('./config');

// var connection = '';

if (process.env.NODE_ENV === 'production') {
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

//strangely adding this causes CORS errors
//var connection = mysql.createConnection(config.mysql.url);

connection.connect(function (error) {
    if (error) throw error;
    console.log("connected to database on " + connection.config.host + " as "
        + connection.config.user + "@" + connection.config.database);
});

module.exports = connection;