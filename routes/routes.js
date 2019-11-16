var user = require('./user_controller');
var authorizer = require('./authenticate');


module.exports = function (app) {

    // app.get('/', (request, response) => {
    //     //This should show on heroku back end build
    //     response.json('just the back end for me');
    //     //THIS IS CURRENTLY WHAT THE BACKEND SHOWS
    // });

    //========Users====================================================================

    app.post("/api/user", function(request, response) {
        user.create(request, response);
    });
    app.post("/api/user/login", function(request, response) {
        user.login(request, response);
    });
    app.delete("/api/user/login", function(request, response) {
        user.logout(request, response);
    });
    app.get("/api/user", authorizer.authenticate, function(request, response) {
        console.log('app.get("/api/user" hit');
        user.getUserBySession(request, response);
    });
    app.get("/api/user/:id", authorizer.authenticate, function(request, response) {
        user.getUserByID(request, response);
    });



    
    // app.get('/api/user', (request, response) => {
    //     console.log('server called');
    //     //This should show on heroku front end build
    //     response.json('just the front end for me NOW');
    // });

    // //login route
    // app.post('/api/user', (request, response) => {
    //     //Request has as lot of items in it and doesn't appear useful to show
    //     //console.log('route request is: ' + 'request has a lot of items in it');
    //     //console.log(request);
    //     //console.log('test 0 key is: ');
    //     //console.log(Object.keys(request)[0]);
    //     //console.log('test 0 value is: ');
    //     //console.log(Object.values(request)[0]);
    //     //response.json('just the front end for me now');
    //     console.log('routes: app.post(/api/user) at routes is hit');
    //     //how/where is this request created????
    //     user.create(request,response)
    // });

}; 