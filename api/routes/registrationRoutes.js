'use strict';
module.exports = function(app) {
  const userList = require('../controllers/registrationController');
  const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next()
  })

  app.post('/users',userList.new_user)

  app.use(function(req, res, next) {
    // check header or url parameters or post parameters for token
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

      // verifies secret and checks exp
      jwt.verify(token, app.get('superSecret'), function (err, decoded) {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });

    } else {

      // if there is no token
      // return an error
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });

    }
  });

  // userList Routes
  app.route('/users')
    .get(userList.get_all_users)


  app.route('/users/:userId')
    .get(userList.user_info)
    .put(userList.change_user_info)
    .delete(userList.delete_user)

  
}

