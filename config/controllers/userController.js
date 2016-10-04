'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	passport = require('passport');


var getErrorMessage = function(err) {

  var message = '';

	if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = 'Usuario ya existe';
        break;
      default:
        message = 'Se ha producido un error';
    }
  } else {
    for (var errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }
  return message;
};

exports.create = function(req, res) {

	var user = new User(req.body);

	user.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(user);
		}
	});
};

exports.list = function(req, res) {

	User.find().exec(function(err, users) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(users);
		}
	});
};

exports.read = function(req, res) {
	res.json(req.user);
};

exports.update = function(req, res) {

	var user = req.user;

	user.p1 = req.body.p1;
  user.p2 = req.body.p2;
  user.p3 = req.body.p3;
  user.p4 = req.body.p4;
  user.p5 = req.body.p5;
  user.p6 = req.body.p6;
  user.p7 = req.body.p7;
  user.p8 = req.body.p8;
  user.p9 = req.body.p9;
  user.p10 = req.body.p10;
  user.p11 = req.body.p11;
  user.totalTrees = req.body.totalTrees;

	user.save(function(err) {
		if (err) {

			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			
			res.json(user);
		}
	});
};


exports.userByID = function(req, res, next, id) {

	User.findById(id).populate('creador', 'firstName lastName fullName').exec(function(err, user) {
		if (err) return next(err);
		if (!user) return next(new Error('Fallo al cargar el artículo ' + id));

		req.user = user;

		next();
	});
};

exports.renderSignin = function(req, res, next) {
  
  if (!req.user) {
    res.render('signin', {
      title: 'Amateapp:: Sign',
      messages: req.flash('error') || req.flash('info')
    });
  } else {
    return res.redirect('/');
  }
};


exports.renderSignup = function(req, res, next) {
  
  if (!req.user) {
    res.render('signup', {
      title: 'Amateapp:: Signup',
      messages: req.flash('error')
    });
  } else {
    return res.redirect('/');
  }
};


exports.signup = function(req, res, next) {
  
    User.register(new User({ 
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        provider: 'local'
      }), req.body.password, function(err) {
        if (err) {
          return res.render('signup', { title: 'Registrate:: ', messages: req.flash('IncorrectUsernameError')});
        }
        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });

      });  
};


exports.saveOAuthUserProfile = function(req, profile, done) {
  
  User.findOne({
    provider: profile.provider,
    providerId: profile.providerId
  }, function(err, user) {
    
    if (err) {
      return done(err);
    } else {
      
      if (!user) {
       
        var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');

        User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
          profile.username = availableUsername;
          user = new User(profile);
          user.save(function(err) {
            
            return done(err, user);
          });
        });
      } else {
        
        return done(err, user);
      }
    }
  });
};


exports.signout = function(req, res) {
  
  req.logout();
  res.redirect('/');
};

exports.requiresLogin = function(req, res, next) {
 
  if (!req.isAuthenticated()) {
    return res.status(401).send({
      message: 'Usuario no está identificado'
    });
  }
  next();
};

