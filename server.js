const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  User = require('./api/models/registrationModel'), //created model loading here
  bodyParser = require('body-parser');
require('dotenv').config()

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/HackWITusUserdb');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/registrationRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('HackWITus Registration REST API start listening on port ' + port);
