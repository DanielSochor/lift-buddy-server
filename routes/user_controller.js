let users = require('./user_ORM_functions');

let user = {
    create: function (request, response) {
        //Request has as lot of items in it and doesn't appear useful to show

        //console.log('request is: ' + request);
        //console.log(JSON.stringify(request));
        //console.log('step 1');
        //let userRequest = {
        //    email_address: 'Test',
        //

        //try using request instead od new user request
        //let userRequest = request;



        //the request creates a lot of junk
        //console.log('user request object key is: ' + Object.keys(userRequest)[0]);
        //console.log('user request object value is: ' + Object.values(userRequest)[0]);

        //console.log(userRequest);
        users.insertNew(request, function (error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log('users.insert New call works');
                response.json({
                    email: request.email_address,
                });
                console.log('response is: ');
                //Investigate this for where the null value comes from, why is email above shown as null
                console.log(response._events);
                console.log(response.email);
                console.log(response);
                console.log('response body is');
                console.log(response.header);
                //console.log(response.IncomingMessage.body);
                //console.email is showing undefined
                console.log('does the above value show as null?');
            }
        });
    }

};

module.exports = user;