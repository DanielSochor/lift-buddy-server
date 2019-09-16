let connection = require('../config/connection');

let orm = {

    insert: function (query, callback) {
        let queryString = "INSERT INTO ?? SET ?";
        let statement = connection.query(queryString, [query.table, query.data], function (error, result) {
            callback(error, result);
        });
        if (query.debug) {
            console.log(statement.sql);
        }
    }

};

module.exports = orm;