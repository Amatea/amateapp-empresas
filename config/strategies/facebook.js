var passport = require('passport'),
    url = require('url'),
    FacebookStrategy = require('passport-facebook').Strategy,
    config = require('../config'),
    users = require('../controllers/userController');

module.exports = function() {
  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields : ['id', 'displayName', 'emails','photos', 'name', 'gender'],
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {
    var providerData = profile._json;
    providerData.accessToken = accessToken;
    providerData.refreshToken = refreshToken;

    var providerUserProfile = {
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      fullName: profile.displayName,
      email: profile.emails[0].value,
      username: profile.username,
      provider: 'facebook',
      providerId: profile.id,
      providerData:{picture: profile.photos[0].value}
    };

    users.saveOAuthUserProfile(req, providerUserProfile, done);
  }));
  
};