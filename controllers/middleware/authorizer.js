let users = require('../../models/users');

let authorizer = {
    authenticate: function(request, response, next){
        users.getMyself(request.headers['x-session-token'], function(error, result){
            if (error){
                console.log(error);
                response.status(500).json({'error': 'oops we did something bad'});
            } else if (!result.length){
                response.status(401).json({'error': 'user must be logged in'});
            } else{
                next();
            }
        });
    },
};

module.exports = authorizer;