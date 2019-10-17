let connection = require('../config/connection');

let orm = {

    insert: function (query, callback) {
        console.log('insert called in orm.js');
        console.log('query table is: ');
        console.log(query.table);
        console.log('query data body is: ');
        console.log(query.data.body);
        console.log('email address is: ');
        console.log(query.data.body.email_address);

        //let Qquery = {
        //    table: 'users',
        //    data: {
        //        email_address: 'a@a.com'
        //    }
        //};
        //console.log(query);

        let queryString = "INSERT INTO ?? SET ?";
        console.log('query string is: ' + queryString);
        let statement = connection.query(queryString, [query.table, query.data.body], function (error, result) {
            callback(error, result);
            console.log(error);
        });
        if (query.debug) {
            console.log('error');
            console.log(statement.sql);
        }
    }

};

module.exports = orm;