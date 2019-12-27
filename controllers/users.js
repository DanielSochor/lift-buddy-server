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

router.get('/api/user/userinfo', (request, response) => {
    console.log('api/userinfo hit in users.js');
    console.log('passed in request.headers are: ');
    console.log(request.headers);
    user.selectWhere({ session_token: request.headers['x-session-token'] }, (error, result) => {
       if (result.length) {
            response.status(200).json(result[0]);
        } else {
            response.status(404).json({ 'error': 'user not found' });
            console.log('attempt to get user info was made');
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
                    password: userRequest.password
                });
            }
        });
    }
});

router.post('/api/user/login', (request, response) => {
    console.log('request body is: ');
    console.log(request.body);
    //TODO: refactor this; we don't need to check email in request as it'll always be undefined
    if (request.body.email_address === undefined) {
        console.log('request username is: ');
        console.log(request.body.username);
        user.selectByUserName(request.body.username, (error, result) => {
            handleLogIn(request, response, error, result);
        });
    }
    else {
        user.selectByEmail(request.body.email_address, (error, result) => {
            handleLogIn(request, response, error, result);
        });
    }
});

router.delete('/api/user/logout', (request, response) => {
    user.update({ session_token: request.headers['x-session-token'] }, (error, result) => {
        response.status(200).json({ 'message': 'user logged out successfully' });
    });
});

let handleLogIn = (request, response, error, result) => {
    if (error) {
        console.log('A');
        console.log(error);
        response.status(500).json({ 'error': 'oops we did something wrong' });
    } else if (!result.length) {
        console.log('B');
        response.status(404).json({ 'error': 'user not found' });
    } else {
        console.log('C');
        let userResult = result[0];
        console.log('user request in handle log in is: ');
        console.log(userResult)
        loginAttempt = hashpass(request.body.password, userResult.salt);
        console.log('loginAttempt is');
        console.log(loginAttempt);
        console.log('loginAttempt.hash is');
        console.log(loginAttempt.hash);
        console.log('userResult.password is');
        console.log(userResult.password);
        if (loginAttempt.hash === userResult.password) {
            let uuid = uuidv1();
            console.log('uuid is: ');
            console.log(uuid);
            console.log('userResult.username is: ');
            console.log(userResult.username);
            console.log('userResult.session_token is: ');
            console.log(userResult.session_token);
            user.updateSession(userResult.username, uuid, (error, queryResult) => {
                delete userResult.password;
                delete userResult.salt;
                //delete userResult.session_token;
                //console.log('response.header(x-session-token, uuid) ');
                //console.log(response.header('x-session-token', uuid));
                response.header('x-session-token', uuid).status(200).json(userResult);
            });
        } else {
            response.status(401).json({ 'error': 'improper login credentials' });
        }
    }
};








// POST route for user log out
router.delete('/api/users/loginX', (request, response) => {
    user.update({ session_token: request.headers['x-session-token'] }, (error, result) => {
        result.status(200).json({ 'message': 'user logged out successfully' });
    });
});

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