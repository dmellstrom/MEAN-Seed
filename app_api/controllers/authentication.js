var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

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
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  if(!/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,254}$/.test(req.body.name) ||
    !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(req.body.email) || req.body.email.length > 254 ||
    req.body.password.length < 6 || req.body.password.length > 254) {
    sendJSONresponse(res, 400, {
      "message": "Invalid characters in request"
    });
    return;
  }

  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(function(err) {
    if (err) {
      res.status(400).json(err);
      return;
    }
    sendToken(res, user);
  });

};

module.exports.login = function(req, res) {

  if(!req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
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
    "message": "Logged out"
  });
};