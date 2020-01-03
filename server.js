require('dotenv').config();
require('./config/db_connection');

const express = require('express');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

// app.all('*', function(req, res, next) {
//   var origin = req.get('origin'); 
//   res.header('Access-Control-Allow-Origin', origin);
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

//const baseURL = (process.env.NODE_ENV === 'production') ? process.env.REACT_APP_SERVER_URL : process.env.REACT_APP_LOCAL_URL;
//TODO: create an origin whitelist with both URLS
//These values used for baseURL don't exist server side

//TODO: doesn't appear to like the trailing / in var whitelist = [process.env.REACT_APP_LOCAL_URL
//TODO: doesn't like http://localhost:3001, may not like the lift-buddy-server
var URLWhiteList = ['http://localhost:3000', 'https://lift-buddy-client.herokuapp.com'];

// var corsOptionsDelegate = function (req, callback) {
//   var corsOptions = {
//     origin: function (origin, callback) {
//       if (whitelist.indexOf(origin) !== -1) {
//         callback(null, true)
//       } else {
//         callback(new Error('Not allowed by CORS'))
//       }
//     },
//     //credentials:true
//   }
//   callback(null, corsOptions);
// }

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
  //allowedHeaders: ['X-PING-OTHER','x-session-token'],
  //adding x-session-token to exposedHeaders didn't help
  //preflightContinue: true,
  //optionsSuccessStatus: 204,
}));
//seems that origin is ignored as adding the extra / and K did nothing
//bottom options commented out as they appear to have no effect

//try to enable pre-flight across the board:
//app.options('*', cors())
//THIS did not help

//app.options('https://lift-buddy-client.herokuapp.com', cors());
//THIS did not help

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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