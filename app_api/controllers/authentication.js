var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var send400 = function(res, message) {
  res.status(400);
  res.json({
    message: message
  });
}

var sendToken = function(res, user) {
  var token = user.generateJwtAndClaim();
  res.status(200);
  res.cookie('token', token.jwt(), {httpOnly: true});
  res.json({
    "claim" : token.claim
  });
}

module.exports.register = function(req, res) {

  if(!req.body.name || !req.body.email || !req.body.password) {
    send400(res, 'All fields required');
    return;
  }

  if (!/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,254}$/.test(req.body.name)) {
    send400(res, 'Invalid characters in request');
    return;
  }

  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(req.body.email) || req.body.email.length > 255) {
    send400(res, 'Invalid email address');
    return;
  }

  if (req.body.password.length < 6 || req.body.password.length > 255) {
    send400(res, 'Password must be between 6 and 255 characters in length');
    return;
  }

  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(function(err) {
    if (err) {
      if (err.code === 11000 || err.code === 11001) {
        send400(res, 'Email address already taken');
        return;
      }
      send400(res, 'Error saving user');
      return;
    }
    sendToken(res, user);
  });

};

module.exports.login = function(req, res) {

  if (!req.body.email || !req.body.password) {
    send400(res, 'All fields required');
    return;
  }

  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      sendToken(res, user);
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};

module.exports.logout = function(req, res) {
  res.status(200);
  res.clearCookie('token');
  res.json({
    message: 'Logged out'
  });
};