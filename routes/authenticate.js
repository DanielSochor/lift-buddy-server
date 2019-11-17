let users = require('./user_ORM_functions');

let authorizer = {
    authenticate: function(request, response, next){
        //console.log('authorizer authenticate hit');
        console.log(request.headers);
        users.getUserBySession(request.headers['x-session-token'], function(error, result){
            console.log('call back reached');
            if (error){
                console.log(error);
                response.status(500).json({'error': 'oops we did something bad'});
            } else if (!result.length){
                //console.log('first else in authenticate reached');
                response.status(401).json({'error': 'user must be logged in'});
            } else{
                console.log('final error reached');
                next();
            }
        });
    },
};

module.exports = authorizer;