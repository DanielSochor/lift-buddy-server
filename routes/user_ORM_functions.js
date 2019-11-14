let orm = require('../config/orm');

let users = {
    insertNew: function(user, callback){
        let query = {
            table: 'users',
            data: user //do the keys of this object match the table columns?
        };
        console.log('user_ORM_funtions: query data is: ' + query.data);
        orm.insert(query, callback);
    },
    selectByEmail: function(email, callback){
        let query = {
            table: 'users',
            where: [{email_address: email.toLowerCase()}]
        };
        orm.select(query, callback);
    },
    selectByUsername: function(username, callback){
        let query = {
            table: 'users',
            where: [{username: username}]
        };
        orm.select(query, callback);
    },
    updateSession: function(email, uuid, callback){
        let query = {
            table: 'users',
            data: {session_token: uuid},
            where: [{email_address: email.toLowerCase()}]
        };
        orm.update(query, callback);
    },
    removeSession: function(session, callback){
        let query = {
            table: 'users',
            data: {session: null},
            where: [{session_token: session}]
        };
        orm.update(query, callback);
    },
    getUserBySession: function(session, callback){
        let query = {
            table: 'users',
            //columns: ['email', 'id', 'created'],
            columns: ['email_address', 'user_id'],
            where: [{session_token: session}]
        };
        orm.select(query, callback);
    },
    getUserByID: function(id, callback){
        let query = {
            table: 'users',
            //columns: ['email', 'id', 'created'],
            columns: ['email_address', 'user_id'],
            where: [{id: id}]
        };
        orm.select(query, callback);
    }
};

module.exports = users;