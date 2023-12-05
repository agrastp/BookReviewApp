const { User } = require('../models');

const passport = require('passport');

passport.serializeUser(function(user, cb) {

    
    
    return cb(null, user.id);
});

// The Xpert Learning AI Assitant gave me this function.
    passport.deserializeUser(function(id, done) {

    User.findOne({ where: { id: id } })

    .then(user => {

        done(null, user);
    })
    .catch(err => {

        done(err, null);

        });
    });

  module.exports = passport;