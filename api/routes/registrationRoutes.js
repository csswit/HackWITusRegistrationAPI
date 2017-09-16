'use strict';
module.exports = function(app) {
  const userList = require('../controllers/registrationController');

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // userList Routes
  app.route('/users')
    .get(userList.get_all_users)
    .post(userList.new_user);


  app.route('/users/:userId')
    .get(userList.user_info)
    .put(userList.change_user_info)
    .delete(userList.delete_user)
};
