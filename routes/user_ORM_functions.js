let orm = require('./orm');

let users = {
    insertNew: function(user, callback){
        //console.log('xxxxx');
        //console.log('user is: ' + user[0]);
        //console.log('user is: ' + user[1]);
        //console.log('test 0 key is: ' + Object.keys(user)[0]);
        //console.log('test 0 value is: ' + Object.values(user)[0]);
        //console.log('user is: ' + user);
        //console.log('xxxxx');
        //user.email = user.email_address.toLowerCase();
        let query = {
            table: 'users',
            data: user //do the keys of this object match the table columns?
        };
        console.log('query is: ' + query);
        console.log('query data is: ' + query.data);
        orm.insert(query, callback);
    }

};

module.exports = users;