const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  User = require('./api/models/registrationModel'), //created model loading here
  bodyParser = require('body-parser');
require('dotenv').config();

const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens



// mongoose instance connection url connection
mongoose.Promise = global.Promise;
const mongoURI=`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DBSRC}`
const options= {useMongoClient: true}

mongoose.connect(mongoURI, options);
app.set('superSecret', process.env.DB_SECRET); // secret variable


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
app.route('/authenticate')
  .post(function (req, res) {
    const name = req.body.name
    const pwd = req.body.password

    if ((name != process.env.DB_USER) || (pwd != process.env.DB_PASS)) {
      res.json({ success: false, message: 'Authentication failed! Sorry!' });
    } else {

      // if user is found and password is right
      // create a token with only our given payload
      // we don't want to pass in the entire user since that has the password
      const payload = {
        admin: true
      };
      var token = jwt.sign(payload, app.get('superSecret'), {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
      });

      // return the information including token as JSON
      res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
      });
    }

  })


var routes = require('./api/routes/registrationRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('HackWITus Registration REST API start listening on port ' + port);
