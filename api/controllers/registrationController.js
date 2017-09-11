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
Request Body for new user:
{
  "name": "John Doe" (String required)
  "birthDate": "01/01/1995" (String required)
  "gender": "M" (String required)
  "genderSpecific": "" (String nullable)

  "email": "doej@wit.edu" (String required)
  "phoneNumber": "123-456-7890" (String required)
  "school": "Wentworth Institute of Technology" (String required)

  "shirtSize": "l" (String required)
  "isResumeLinkProvided": "true" (boolean nullable)
  "resumeLink": "http://resumeLink.com/link" (string nullable)

  "dietaryRestriction": "vegetarian" (String nullable)
  "accommodations": "" (String nullable)
  "additionalComment": "" (String nullable)
}

Response Model:
{
  resCode: 200
  if (isResumeLinkProvided) "" else "https://s3.aws.com/link"
}
**/

exports.new_user = function(req, res) {
  const new_user = new User(req.body);
  new_user.save(function(err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};


exports.user_info = function(req, res) {
  User.findById(req.params.userId, function(err, user) {
    if (err) res.send(err);
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
