'use strict';
const mongoose = require('mongoose');
const mongoose_csv = require('mongoose-csv');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: 'Need user\'s name!'
  },
  birthDate: {
    type: String,
    required: 'Need user\'s age for authorization'
  },
  gender: {
    type: String,
    default: 'Prefer not to answer',
    required: 'Need user\'s gender'
  },
  email: {
    type: String,
    required: 'Need user\'s email!'
  },
  phoneNumber: {
    type: String,
    required: 'need user\'s phone number'
  },
  school: {
    type: String,
    required: 'Need user\'s school'
  },
  shirtSize: {
    type: String,
    enum: ['xs', 's', 'm', 'l', 'xl'],
    default: ['m'],
    required: 'Need user\'s shirt size'
  },
  resumeURL: {
    type: String
  },
  dietaryRestriction: {
    type: String,
  },
  accommodations: {
    type: String,
  },
  additionalComment: {
    type: String
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  rsvp: {
    type: String,
    enum: ['y','na','n'],
    default: ['na']
  }
});
UserSchema.plugin(mongoose_csv);

module.exports = mongoose.model('Users', UserSchema);
