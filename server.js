require('dotenv').config();
require('./config/db_connection');

const express = require('express');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

console.log('process.env.NODE_ENV is:', process.env.NODE_ENV);

//TODO: doesn't appear to like the trailing / in var whitelist = [process.env.REACT_APP_LOCAL_URL
//TODO: doesn't like http://localhost:3001, may not like the lift-buddy-server
var URLWhiteList = ['http://localhost:3000', 'https://lift-buddy-client.herokuapp.com'];

//this attempts to enable CORS preflight
app.use(cors({
  //configures the Access-Control-Allow-Credentials CORS header
  credentials: true, 

  //lets the server whitelist headers that browsers are allowed to access
  exposedHeaders: ['X-PINGOTHER', 'Set-Cookie', 'Content-Length', 'Accept', 'X-Requested-With', 'X-HTTP-Method-Override', 'x-session-token', 'Content-Type', 'Authorization'],
  
  methods: ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT'],
  //restrict to a specific origins
  origin: URLWhiteList,

  //indicates to clients that server responses will differ based on the value of the Origin
  //doesn't appear to be useful here
  //vary: origin,

  //this did not work
  //origin: '*',

  //used in response to a preflight request to indicate which
  //HTTP headers can be used when making the actual request

  //specifies which headers are allowed to change the state of the server
  allowedHeaders: ['X-PINGOTHER', 'Set-Cookie', 'Content-Length', 'Accept', 'X-Requested-With', 'X-HTTP-Method-Override', 'x-session-token', 'Content-Type', 'Authorization'],
  
  //preflightContinue: false,
  //maxAge: 3600,
  //adding x-session-token to exposedHeaders didn't help
  //preflightContinue: true,
  //optionsSuccessStatus: 204,
}));
//bottom options commented out as they appear to have no effect

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'));
};

// Add routes
//require("./routes")(app);
var userRoute = require("./controllers/users.js");
app.use(userRoute);
//require('./routes/routes')(app);

// Start the API server
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);