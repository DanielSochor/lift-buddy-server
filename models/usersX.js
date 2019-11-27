let orm = require('./global/orm');

let users = {
    insertNew: function(user, callback){
        user.email_address = user.email_address.toLowerCase();
        let query = {
            table: 'users',
            data: user
        };
        orm.insert(query, callback);
    },
    selectByUsername: function(username, callback){
        let query = {
            table: 'users',
            where: [{username: username}]
        };
        orm.select(query, callback);
    },
    selectByEmail: function(email_address, callback){
        let query = {
            table: 'users',
            where: [{email_address: email_address.toLowerCase()}]
        };
        orm.select(query, callback);
    },
    updateSession: function(email_address, uuid, callback){
        let query = {
            table: 'users',
            data: {session: uuid},
            where: [{email_address: email_address.toLowerCase()}]
        };
        orm.update(query, callback);
    },
    removeSession: function(session, callback){
        let query = {
            table: 'users',
            data: {session: null},
            where: [{session: session}]
        };
        orm.update(query, callback);
    },
    getMyself: function(session, callback){
        let query = {
            table: 'users',
            columns: ['email_address', 'user_id', 'created', 'modified'],
            where: [{session: session}]
        };
        orm.select(query, callback);
    },
    getUserByID: function(id, callback){
        let query = {
            table: 'users',
            columns: ['email_address', 'user_id', 'created', 'modified'],
            where: [{user_id: id}]
        };
        orm.select(query, callback);
    }
};

module.exports = users;