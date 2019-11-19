let hashPass = require('hashPass');
let uuidv1 = require('uuid/v1');
let users = require('../models/users');

let user = {
    create: function(request, respsonse){
        if (!request.body.email_address.includes('@') || !request.body.email_address.includes('.')){
            respsonse.status(400).json({'error': 'email_address is not valid'});
        } else if (request.body.password !== request.body.password_confirm){
            respsonse.status(400).json({'error': 'passwords do not match'});
        } else {
            let hashedPassword = hashPass(request.body.password);
            let userRequest = {
                username: request.body.username,
                email_address: request.body.email_address,
                password: hashedPassword.hash,
                salt: hashedPassword.salt
            };
            users.insertNew(userRequest, function(error, result){
                if (error){
                    console.log(error);
                    if (error.sqlMessage.includes('Duplicate')){
                        respsonse.status(400).json({'error': 'email_address already exists in system'});
                    }else{
                        respsonse.status(500).json({'error': 'oops we did something bad'});
                    }
                }else{
                    respsonse.json({
                        user_id: result.insertId,
                        email_address: userRequest.email_address
                    });
                }
            });
        }
    },
    login: function(request, response){
        users.selectByUsername(request.body.username, function(error, result){
            if (error){
                console.log(error);
                response.status(500).json({'error': 'oops we did something bad'});
            } else if(!result.length) {
                response.status(404).json({'error': 'user not found'});
            } else {
                user = result[0];
                console.log(user);
                loginAttempt = hashPass(request.body.password, user.salt);
                if (loginAttempt.hash === user.password){
                    let uuid = uuidv1();
                    users.updateSession(user.email_address, uuid, function(error, result) {
                        delete user.password;
                        delete user.salt;
                        delete user.session;
                        response.header('x-session-token', uuid).json(user);
                    });
                }else{
                    response.status(401).json({'error': 'improper login credentials'});
                }
            }
        });
    },
    logout: function(request, response){
        users.removeSession(request.headers['x-session-token'], function(error, result){
            response.json({'message': 'user logged out successfully'});
        });
    },
    getMyself: function(request, response){
        users.getMyself(request.headers['x-session-token'], function(error, result){
            response.json(result[0]);
        });
    },
    getUserByID: function(request, response){
        users.getUserByID(request.params.id, function(error, result){
            if (result.length){
                response.json(result[0]);
            } else {
                response.status(404).json({'error': 'user not found'});
            }
        });
    }
};

module.exports = user;