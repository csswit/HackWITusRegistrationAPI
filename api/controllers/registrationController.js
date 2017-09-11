'use strict';


const mongoose = require('mongoose'),
  User = mongoose.model('Users');

exports.get_all_users = function(req, res) {
  User.find({}, function(err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};


/**
Request Model for new user:
{
  "name": "John Doe" (String)
  "email": "doej@wit.edu" (String)
  "school": "Wentworth Institute of Technology" (String)
  "shirtSize": "l" (Char/String)
  "isResumeLinkProvided": "true" (boolean nullable)
}

Response Model:
{
  resCode: 200
  if (isResumeLinkProvided) "" else "https://s3.aws.com/link"
}
**/

exports.new_user = function(req, res) {
  const new_user = new User(req.body);
  new_task.save(function(err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};


exports.user_info = function(req, res) {
  User.findById(req.params.userId, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.change_user_info = function(req, res) {
  User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.delete_user = function(req, res) {
  User.remove({
    _id: req.params.iserId
  }, function(err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  });
};
