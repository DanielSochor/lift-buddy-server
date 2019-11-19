var mysql = require("mysql");
var config = require("../../config");

var connection = mysql.createConnection(config.mysql.url);

connection.connect(function(error){
    if (error) throw error;
});

module.exports = connection;