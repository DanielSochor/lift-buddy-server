var user = require("./user_controller");

module.exports = function (app) {

    //displays during view of backend
    app.get('/', (request, response) => {
        response.json('just the back end for me');
    });
    
    //displays during button press
    app.get('/api/user', (request, response) => {
        response.json('just the front end for me');
    });

    //login route
    app.post('/api/user', (request, response) => {
        console.log('route request is:' + request);
        console.log('test 0 key is: ' + Object.keys(request)[0]);
        console.log('test 0 value is: ' + Object.values(request)[0]);
        //response.json('just the front end for me now');
        console.log('app.post(/api/user) at routes');
        //how/where is this request created????
        user.create(request,response)








    });

}; 