module.exports = function (app) {

    //displays during view of backend
    app.get('/', (request, response) => {
        response.json('just the back end for me');
    });
    
    //displays during button press
    app.get('/api/user', (request, response) => {
        response.json('just the front end for me');
    });

}; 