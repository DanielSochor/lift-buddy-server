const express = require('express');
const hashpass = require('hashpass');
const uuidv1 = require('uuid');
const user = require('../models/user.js');

let router = express.Router();

// router.get('/', (request, response) => {
//     response.json('just the back end for me');
// });

//routes

//GET route for fetching one user with all data by session token

//POST route for creating new user sign up

//POST route for user login

//POST route for user logout

//functions

//handle login - 

router.get('/api/user', (request, response) => {
    console.log('api/user hit in users.js');
    user.selectWhere({ session_token: request.headers['x-session-token'] }, (error, result) => {
        if (result.length) {
            response.status(200).json(result[0]);
        } else {
            response.status(404).json({ 'error': 'user not found' });
        }
    })
});

router.post('/api/user/signup', (request, response) => {
    console.log('api/user/signup hit in users.js');
    if (!request.body.email_address.includes('@') || !request.body.email_address.includes('.')) {
        response.status(400).json({ 'error': 'email is not valid' });
    } else if (request.body.password !== request.body.password_confirm) {
        response.status(400).json({ 'error': 'passwords do not match' });
    } else {
        let hashedPassword = hashpass(request.body.password);
        let userRequest = {
            first_name: request.body.first_name,
            last_name: request.body.last_name,
            email_address: request.body.email_address,
            username: request.body.username,
            password: hashedPassword.hash,
            salt: hashedPassword.salt
        };
        user.createUser(userRequest, (error, result) => {
            if (error) {
                console.log(error);
                if (error.sqlMessage.includes('Duplicate')) {
                    response.status(400).json({ 'error': 'email already exists in system' });
                } else {
                    response.status(500).json({ 'error': 'oops we did something bad' });
                }
            } else {
                response.status(200).json({
                    user_id: result.insertId,
                    email: userRequest.email_address
                });
            }
        });
    }
});

router.post('/api/user/login', (request, response) => {
    if (request.body.email_address === undefined) {
        user.selectWhere(request.body.username, (error, result) => {
            handleLogin(request, response, error, result);
        });
    }
    else {
        user.selectByEmail(request.body.email_address, (error, result) => {
            handleLogin(request, response, error, result);
        });
    }
});

router.post('/api/user/logout', (request, response) => {
    users.removeSession(request.headers['x-session-token'], function(error, result){
        response.json({'message': 'user logged out successfully'});
    });
});

let handleLogin = (request, response, error, result) => {
    if (error) {
        console.log(error);
        response.status(500).json({ 'error': 'oops we did something wrong' });
    } else if (!result.length) {
        response.status(404).json({ 'error': 'user not found' });
    } else {
        let userResult = result[0];
        loginAttempt = hashpass(request.body.password, userResult.salt);
        if (loginAttempt.hash === userResult.password) {
            let uuid = uuidv1();
            user.updateSession(userResult.email_address, uuid, (error, queryResult) => {
                delete userResult.password;
                delete userResult.salt;
                delete userResult.session_token;
                //response.header('x-session-token', uuid).status(200).json(userResult);
                response.header('x-session-token').json(userResult);
            });
        } else {
            response.status(401).json({ 'error': 'improper login credentials' });
        }
    }
};

































router.get('/api/users/signupX', (request, response) => {
    response.json('api/users/signin hit');
    console.log('api/users/signin hit');
});

// GET route for fetching one user by session token header or
// all users by default
router.get("/api/usersX", (request, response) => {
    console.log('list all users');

    if (request.headers['x-session-token']) {
        console.log('cha cha cha');
        console.log('request.headers[x-session-token]');
        console.log(request.headers['x-session-token']);
        user.selectWhere({ session_token: request.headers['x-session-token'] }, (error, result) => {
            console.log('request headers in user.select where in users.js is: ');
            console.log(request.headers);
            if (result.length) {
                response.status(200).json({ data: result });
            } else {
             response.status(404).json({ 'error': 'user not found' });
            }
        })
    } else {
        console.log('do not know what to tell you');
    }
        // user.selectUsersJoinChannels({ session_token: req.headers['x-session-token'] }, {}, (err, result) => {
        //     if (result.length) {

        //         let formatResult = formatUsersObject(result);

        //         user.selectUsersJoinGroups({ session_token: req.headers['x-session-token'] }, formatResult, (err, result, params) => {
        //             if (result.length) {
        //                 result.forEach(element => {
        //                     params.direct_messages.push({
        //                         direct_group_id: element.direct_group_id
        //                     });
        //                 });
        //             }
        //             res.status(200).json(params);
        //         });
        //     } else {
        //         res.status(404).json({ 'error': 'user not found' });
        //     }
        // });
    // } else {
    //     user.select((err, result) => {
    //         res.status(200).json({ data: result });
    //     });
    // }
});

// GET route for fetching one user by ID
router.get("/api/users/:id", (request, response) => {
    console.log('retrieve user');

    user.selectWhere({ user_id: request.params.id }, (err, result) => {
        if (result.length) {
            response.status(200).json(result[0]);
        } else {
            response.status(404).json({ 'error': 'user not found' });
        }
    })
});

// POST route for creating a user
router.post("/api/users", (request, response) => {
    if (!request.body.email_address.includes('@') || !request.body.email_address.includes('.')) {
        response.status(400).json({ 'error': 'email is not valid' });
    } else if (request.body.password !== request.body.password_confirm) {
        response.status(400).json({ 'error': 'passwords do not match' });
    } else {
        let hashedPassword = hashpass(request.body.password);
        let userRequest = {
            first_name: request.body.first_name,
            last_name: request.body.last_name,
            email_address: request.body.email_address,
            username: request.body.username,
            // alias: req.body.alias,
            password: hashedPassword.hash,
            salt: hashedPassword.salt
        };
        console.log('userRequest for post at api/users is: ');
        console.log(userRequest);
        user.createUser(userRequest, (error, result) => {
            if (error) {
                console.log(error);
                if (error.sqlMessage.includes('Duplicate')) {
                    response.status(400).json({ 'error': 'email already exists in system' });
                } else {
                    response.status(500).json({ 'error': 'oops we did something bad' });
                }
            } else {
                response.status(200).json({
                    user_id: result.insertId,
                    ///username: result.userame,
                    email: userRequest.email_address
                });
                //console.log('res is: ');
                //console.log(res);
            }
        });
    }
});

// POST route for user log in
router.post('/api/users/login', (request, response) => {
    //user can sign in with email or username
    console.log('req first item is: ');
    console.log(request[0]);
    console.log('res first item is: ');
    console.log(response[0]);
    if (request.body.email_address === undefined) {
        user.selectWhere(request.body.username, (error, result) => {
            handleLogin(request, response, error, result);
        });
    }
    else {
        user.selectByEmail(request.body.email_address, (error, result) => {
            handleLogin(request, response, error, result);
        });
    }
});

// POST route for user log out
router.delete('/api/users/login', (request, response) => {
    user.update({ session_token: request.headers['x-session-token'] }, (error, result) => {
        result.status(200).json({ 'message': 'user logged out successfully' });
    });
});

// Update the user from the SELECT query with a session_token
let handleLoginX = (request, response, error, result) => {
    if (error) {
        console.log('A');
        console.log(error);
        response.status(500).json({ 'error': 'oops we did something bad' });
    } else if (!result.length) {
        console.log('B');
        response.status(404).json({ 'error': 'user not found' });
    } else {
        console.log('C');
        console.log('result is: ');
        console.log(result);
        //here is the problem the session is null
        let userResult = result[0];
        console.log(result[0]);
        loginAttempt = hashpass(request.body.password, userResult.salt);
        if (loginAttempt.hash === userResult.password) {
            let uuid = uuidv1();
            user.updateSession(userResult.email_address, uuid, (error, queryResult) => {
                delete userResult.password;
                delete userResult.salt;
                delete userResult.session_token;
                response.header('x-session-token', uuid).status(200).json(userResult);
            });
        } else {
            response.status(401).json({ 'error': 'improper login credentials' });
        }
    }
};

// Format the JSON user response object
let formatUsersObject = result => {
    let newResult = {
        'user_id': result[0].user_id,
        'first_name': result[0].first_name,
        'last_name': result[0].last_name,
        'email_address': result[0].email_address,
        'username': result[0].username,
        'session_token': result[0].session_token,
        'created': result[0].created,
        'updated': result[0].updated,
        'channels_member_of': [],
        'direct_messages': []
    };

    result.forEach(element => {
        newResult.channels_member_of.push({
            channel_id: element.channel_id,
            channel_name: element.channel_name
        });
    });

    return newResult;
};

module.exports = router;