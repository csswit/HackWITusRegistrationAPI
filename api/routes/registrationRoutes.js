'use strict';
module.exports = function(app) {
  const userList = require('../controllers/registrationController');

  // userList Routes
  app.route('/users')
    .get(userList.get_all_users)
    .post(userList.new_user);


  app.route('/users/:userId')
    .get(userList.user_info)
    .put(userList.change_user_info)
    .delete(userList.delete_user)
};
