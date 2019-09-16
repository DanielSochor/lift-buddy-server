let users = require('./user_ORM_functions');

let user = {
    create: function (request, response) {
        let userRequest = {
            email_address: 'test',
        };
        users.insertNew(userRequest, function (error, result) {
            if (error) {
                console.log(error);
            } else {
                response.json({
                    email: userRequest.email_address,
                });
            }
        });
    }

};

module.exports = user;