require('dotenv').config();
require('./config/connection');

const express = require('express');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//  app.use(express.static('client/build'));
// }

// Add routes
require('./routes/routes')(app);

// Start the API server
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);