const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const crypto = require('crypto');
const {scrypt} = require('crypto');
const { promisify } = require('util');
const {hashSinglePassword} = require('../utils/hash-password.js');
//const {sessionSaveWithPromise} = require('../utils/session-promise-functions.js') 

//https://www.passportjs.org/packages/passport-local/
passport.use(new LocalStrategy(
    
    {
        passReqToCallback: true
    },

    async function(req, username, password, done) {

        

        try {

            req.res.set('Cache-Control', 'no-store');

            const user = await User.findOne({ where: { username: username } });

            if (!user) {

                req.invalidCredentials = true;

                req.res.redirect('/login?valid=false');

              return done(null, false, { message: 'Incorrect username or password' });
            }

            //https://www.passportjs.org/tutorials/password/verify/
            let hashedPassword = await hashSinglePassword(password, user.salt)

            let validPassword = (crypto.timingSafeEqual(Buffer.from(user.password, 'hex'), hashedPassword));

            if (!validPassword) {

                req.invalidCredentials = true;


                req.res.redirect('/login?valid=false');

                return done(null, false, { message: 'Incorrect username or password' });
            }

            req.loggedInUser = user; 

            return done(null, user);

        } catch (err) {

            return done(err);
        }
    }         
));

module.exports = passport;





