var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwtAndClaim = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  var claim = {
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  };
  return {
    'jwt': function () { return jwt.sign(claim, "MY_SECRET") },
    'claim': claim
  };
  // DO NOT KEEP YOUR SECRET IN THE CODE!
};

mongoose.model('User', userSchema);
