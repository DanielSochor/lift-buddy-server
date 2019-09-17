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
        //console.log(request);
        response.json('just the front end for me now');
        console.log('step 0');
        //user.create(request,response)
    });

}; 