'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/config');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var flash = require('connect-flash');
var morgan = require('morgan');
var passport = require('passport');

var mongoose = require('./config/mongoose');
var passport_conf = require('./config/passport');

var app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret
  }));

app.set('view engine', 'ejs')

app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());

app.get('/', function (req, res) {
  res.render('index', {
    title: 'Amateapp',
    user: JSON.stringify(req.user)
  });
})

app.get('/profile', function(req, res){
  res.render('profile.ejs', {
    title: 'hola',
  })
})

app.get('/oauth/google', passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
    failureRedirect: '/signin'
  }));
  app.get('/oauth/google/callback', passport.authenticate('google', {
    failureRedirect: '/signin',
    successRedirect: '/'
  }));

app.get('/auth/facebook', passport.authenticate('facebook', { scope: [ 'email' ] }));
  app.get('/auth/facebook/callback', passport.authenticate('facebook',{ 
    successRedirect: '/', 
    failureRedirect: '/signin' 
  }));

 app.get('/signout', function (req, res){
   req.logout();
    res.redirect('/');

 });

var db = mongoose();
var passport_conf = passport_conf();

app.listen(3000, function (){
  console.log('Servidor en el puerto 3000')
});