'use strict';

var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  User = require('mongoose').model('User');


module.exports = function() {
 
  passport.use(new LocalStrategy(User.authenticate()));
};