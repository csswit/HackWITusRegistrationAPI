'use strict';


const mongoose = require('mongoose'),
  User = mongoose.model('Users');

  


const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});



exports.get_all_users = function(req, res) {
  const currentDate = new Date()
  res.writeHead(200, {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename=${currentDate.getMonth()+1}${currentDate.getDate()}${currentDate.getFullYear()}_HackerList.csv`
  });
  User.find({}).csv(res);
};


/**
Request Body for new user:
{
  "name": "John Doe" (String required)
  "birthDate": "01/01/1995" (String required)
  "gender": "Male" (String required)

  "email": "doej@wit.edu" (String required)
  "phoneNumber": "123-456-7890" (String required)
  "school": "Wentworth Institute of Technology" (String required)

  "shirtSize": "l" (String required)
  "isResumeLinkProvided": "true" (boolean nullable)
  "resumeURL": "http://resumeLink.com/link" (string nullable)

  "dietaryRestriction": "vegetarian" (String nullable)
  "accommodations": "" (String nullable)
  "additionalComment": "" (String nullable)
}

Response Model:
{
  resCode: 200
}
**/

exports.user_rsvp = function(req, res){
  User.findOneAndUpdate({email: { $regex: new RegExp("^" + req.body.email.toLowerCase(), "i") }}, req.body, {new:false}, (err, user) => {
    if (err) 
      res.send(err)
    else {
      res.json(user);
    }
  })
}

exports.new_user = function(req, res) {
  const new_user = new User(req.body);
  new_user.save(function(err, user) {
    if (err) res.send(err);
    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Confirmation for HackWITus',
      html: "Hey There!<br/><br/> You've been registered for HackWITus Fall 2017! Please be at <a href=\"https://goo.gl/maps/MUGpse7Lp3t\"><b>Ira Allen Building, 540 Parker St, Boston MA 02120</b></a> by <b>12:00PM</b> <i>(doors will opened at 9:00AM)</i> on <b>November 18th</b>. Let us know if you have any questions or concerns by getting in touch with us at <a href=\"mailto:contact@hackwit.us\">contact@hackwit.us</a>.<br/><br/>We look forward to seeing you!<br/>The HackWITus Team "
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) console.log(error)
      else {
        console.log('Email sent: ' + info.response);
        res.json(user);
      }
    });
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
