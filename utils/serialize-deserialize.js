const { User } = require('../models');

const passport = require('passport');

/* This function takes the user and stores it in the session. */
passport.serializeUser(function(user, cb) {

    
    
    return cb(null, user.id);
});

/* The Xpert Learning AI Assitant gave me this function.  It takes the 
user out of the session and gives it to route request properties.*/
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