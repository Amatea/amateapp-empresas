'use strict';

var passport = require('passport'),
    mongoose = require('mongoose');

module.exports = function() {
  
  var User = mongoose.model('User');
  
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  //Cargar los archivos de configuración de estrategias de Passport
  require('./strategies/local.js')();
  require('./strategies/google.js')();
  require('./strategies/facebook.js')();
};