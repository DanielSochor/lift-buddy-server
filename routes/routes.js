module.exports = function (app) {

    //displays during view of backend
    app.get('/', (request, response) => {
        response.json('ab');
    });
    
    //displays during button press
    app.get('/api/user', (request, response) => {
        response.json('ac');
    });

}; 