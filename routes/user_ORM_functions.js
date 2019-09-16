let orm = require('./orm');

let users = {
    insertNew: function(user, callback){
        user.email = user.email.toLowerCase();
        let query = {
            table: 'users',
            data: user
        };
        orm.insert(query, callback);
    }

};

module.exports = users;