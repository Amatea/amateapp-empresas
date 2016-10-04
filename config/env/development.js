module.exports = {
  db: 'mongodb://localhost/UserDB',
  sessionSecret: 'developmentSessionSecret',
  google: {
    clientID: '401637428460-vsamojb5lqciiq5m1k7s4d5sh9c2gk1e.apps.googleusercontent.com',
    clientSecret: 'N2dGszmxN5Lvmyh7MJJc8Y9K',
    callbackURL: 'http://localhost:3000/oauth/google/callback'
  },
  facebook: {
    clientID: '2082485698642238',
    clientSecret: '92db4727bf904bc5126b1739ac4794d3',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  }
};



