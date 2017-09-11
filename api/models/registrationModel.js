'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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

const UserSchema = new Schema({
  name: {
    type: String,
    required: 'Need user name!'
  },
  email: {
    type: String,
    required: 'Need user email!'
  },
  school: {
    type: String,
    required: 'Need user\'s school'
  },
  shirtSize: {
    type: [{
      type: String,
      enum: ['xs', 's', 'm', 'l', 'xl']
    }],
    default: ['l']
  },
  resumeURL: {
    type: String
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Users', UserSchema);
