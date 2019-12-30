require('dotenv').config();
require('./config/db_connection');

const express = require('express');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

const baseURL = (process.env.NODE_ENV === 'production') ? process.env.REACT_APP_SERVER_URL : process.env.REACT_APP_LOCAL_URL;
//TODO: create an origin whitelist with both URLS

//TODO: doesn't appear to like the trailing / in var whitelist = [process.env.REACT_APP_LOCAL_URL
//TODO: doesn't like http://localhost:3001, may not like the lift-buddy-server
var whitelist = ['http://localhost:3000', 'https://lift-buddy-client.herokuapp.com']

var corsOptionsDelegate = function (req, callback) {
  var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    //credentials:true
  }
  callback(null, corsOptions);
}

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//this should enable CORS preflight
app.use(cors({
  //this enables cookies over CORS
  credentials: true, 
  //expose headers beyond the default 6
  exposedHeaders: ['Set-Cookie', 'Content-Length', 'Accept', 'X-Requested-With', 'X-HTTP-Method-Override', 'x-session-token' ],
  methods: ['GET', 'POST', 'OPTIONS', 'HEAD'],
  //restrict to a specific origin
  origin: 'https://lift-buddy-client.herokuapp.com/',

  maxAge: 3600,
  allowedHeaders: ['x-session-token'],
  //adding X-session-token to exposedHeaders didn't help
  preflightContinue: true,
  optionsSuccessStatus: 204,
}));
//seems that origin is ignored as adding the extra / and K did nothing
//bottom options commented out as they appear to have no effect

//try to enable pre-flight across the board:
//app.options('*', cors())
//THIS did not help

//app.options('https://lift-buddy-client.herokuapp.com', cors());
//THIS did not help

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