//Authentication for signing up and hashes password

const {v4: uuidv4} = require('uuid');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User.js');
const crypto = require('crypto');
const {hashSinglePassword} = require('./hash-password.js');
//const {sessionSaveWithPromise} = require('../utils/session-promise-functions.js') 

//https://www.passportjs.org/packages/passport-local/
passport.use('signup', new LocalStrategy(
    
    {
        passReqToCallback: true
    },

    async function(req, username, password, done) {

        try {

            req.res.set('Cache-Control', 'no-store');

            

            const duplicateUser = await User.findOne({ where: { username: username } });

            console.log("duplicate user", duplicateUser);

            if (duplicateUser) {

                console.log("duplicate user2");

                req.res.redirect('/signup?duplicateUser=true');

                return done(null, false, { message: 'Username already in use' });
            }

            let alphanumericRegex = /^[a-zA-Z0-9]+$/;
            alphanumericRegex.test(username);

            if(!(alphanumericRegex.test(username))){

                req.res.redirect('/signup?invalidUsername=true');

                return done(null, false, { message: 'Username must contain only letters and numbers' });
            }

            let email = req.body.email;

            if(email === ""){

                email = null;
            }

            let salt = uuidv4();
            console.log("password", password);
            let hashedPassword = await hashSinglePassword(password, salt, "creation");

            console.log("hashed password", hashedPassword);

             const user = await User.create(
                
                {
                    username: username,
                    email: email,
                    password: hashedPassword,
                    salt: salt
                }
            );

            req.loggedInUser = user; 

            console.log("req.loggedInUser", req.loggedInUser);

            return done(null, user);

        } catch (err) {

            console.log(err);
        }
    }         
));

module.exports = passport;
