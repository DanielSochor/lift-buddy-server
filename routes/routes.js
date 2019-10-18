var user = require("./user_controller");

module.exports = function (app) {

    //displays during view of backend
    app.get('/', (request, response) => {
        //This should show on heroku back end build
        response.json('just the back end for me');
    });
    
    //displays during button press
    app.get('/api/user', (request, response) => {
        console.log('server called');
        //This should show on heroku front end build
        response.json('just the front end for me');
    });

    //login route
    app.post('/api/user', (request, response) => {
        //Request has as lot of items in it and doesn't appear useful to show
        //console.log('route request is: ' + 'request has a lot of items in it');
        //console.log(request);
        //console.log('test 0 key is: ');
        //console.log(Object.keys(request)[0]);
        //console.log('test 0 value is: ');
        //console.log(Object.values(request)[0]);
        //response.json('just the front end for me now');
        console.log('app.post(/api/user) at routes');
        //how/where is this request created????
        user.create(request,response)
    });

}; 