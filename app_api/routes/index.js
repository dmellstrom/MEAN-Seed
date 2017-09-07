var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload',
  getToken: function (req) {
    if (req.cookies.token) {
      return req.cookies.token;
    }
    return null;
  }
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.post('/logout', ctrlAuth.logout);

//Unspecified API route
router.use(function(req, res) {
  res.sendStatus(404);
});

module.exports = router;
