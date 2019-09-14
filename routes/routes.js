module.exports = function (app) {

    app.get('/', (request, response) => {
        response.json('ab');
    });
    
    app.get('/api/user', (request, response) => {
        response.json('ac');
    });

}; 