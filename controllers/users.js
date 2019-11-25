const express = require('express');
const hashpass = require('hashpass');
const uuidv1 = require('uuid');
const user = require('../models/user.js');

let router = express.Router();

router.get('/', (req, res) => {
    response.json('just the back end for me');
});

router.get('/api/users/signup', (req, res) => {
    response.json('api/users/signin hit');
    console.log('api/users/signin hit');
});

// GET route for fetching one user by session token header or
// all users by default
router.get("/api/users", (req, res) => {
    console.log('list all users');

    if (req.headers['x-session-token']) {
        console.log('cha cha cha');
        user.selectWhere({ session_token: req.headers['x-session-token'] }, (err, result) => {
            if (result.length) {
                res.status(200).json({ data: result });
            } else {
             res.status(404).json({ 'error': 'user not found' });
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
router.get("/api/users/:id", (req, res) => {
    console.log('retrieve user');

    user.selectWhere({ user_id: req.params.id }, (err, result) => {
        if (result.length) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ 'error': 'user not found' });
        }
    })
});

// POST route for creating a user
router.post("/api/users", (req, res) => {
    if (!req.body.email_address.includes('@') || !req.body.email_address.includes('.')) {
        res.status(400).json({ 'error': 'email is not valid' });
    } else if (req.body.password !== req.body.password_confirm) {
        res.status(400).json({ 'error': 'passwords do not match' });
    } else {
        let hashedPassword = hashpass(req.body.password);
        let userRequest = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email_address: req.body.email_address,
            username: req.body.username,
            // alias: req.body.alias,
            password: hashedPassword.hash,
            salt: hashedPassword.salt
        };
        console.log('userRequest for post at api/users is: ');
        console.log(userRequest);
        user.createUser(userRequest, (err, result) => {
            if (err) {
                console.log(err);
                if (err.sqlMessage.includes('Duplicate')) {
                    res.status(400).json({ 'error': 'email already exists in system' });
                } else {
                    res.status(500).json({ 'error': 'oops we did something bad' });
                }
            } else {
                res.status(200).json({
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
router.post('/api/users/login', (req, res) => {
    //user can sign in with email or username
    console.log('req first item is: ');
    console.log(req[0]);
    console.log('res first item is: ');
    console.log(res[0]);
    if (req.body.email_address === undefined) {
        user.selectWhere(req.body.username, (err, result) => {
            handleLogin(req, res, err, result);
        });
    }
    else {
        user.selectByEmail(req.body.email_address, (err, result) => {
            handleLogin(req, res, err, result);
        });
    }
});

// POST route for user log out
router.delete('/api/users/login', (req, res) => {
    user.update({ session_token: req.headers['x-session-token'] }, (err, result) => {
        res.status(200).json({ 'message': 'user logged out successfully' });
    });
});

// Update the user from the SELECT query with a session_token
let handleLogin = (req, res, err, result) => {
    if (err) {
        console.log('A');
        console.log(err);
        res.status(500).json({ 'error': 'oops we did something bad' });
    } else if (!result.length) {
        console.log('B');
        res.status(404).json({ 'error': 'user not found' });
    } else {
        console.log('C');
        console.log('result is: ');
        console.log(result);
        //here is the problem the session is null
        let userResult = result[0];
        console.log(result[0]);
        loginAttempt = hashpass(req.body.password, userResult.salt);
        if (loginAttempt.hash === userResult.password) {
            let uuid = uuidv1();
            user.updateSession(userResult.email_address, uuid, (error, queryResult) => {
                delete userResult.password;
                delete userResult.salt;
                delete userResult.session_token;
                res.header('x-session-token', uuid).status(200).json(userResult);
            });
        } else {
            res.status(401).json({ 'error': 'improper login credentials' });
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