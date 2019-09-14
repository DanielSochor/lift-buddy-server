const express = require('express');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// Serve up static assets (usually on heroku)
//if (process.env.NODE_ENV === "production") {
//  app.use(express.static(path.join(__dirname, 'client/build')));
//}

//app.get('*', (request,response => {
    //response.sendFile(path.join(__dirname, 'client/build','index.html'));
//}));

// Add routes, both API and view
// add the route directly here for now
app.get('api/user', (req, res) => {
    //response.send('Hello World!');
    res.json('a');
    //console.log('server hit, response is');
    //console.log(response);
});

// Start the API server
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);