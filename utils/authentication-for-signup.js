//Authentication for signing up and hashes password

const {v4: uuidv4} = require('uuid');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User.js');
const crypto = require('crypto');
const {hashSinglePassword} = require('./hash-password.js');
//const {sessionSaveWithPromise} = require('../utils/session-promise-functions.js') 


passport.use('signup', new LocalStrategy(
    
    {
        passReqToCallback: true
    },

    //This function signs the user up if the username matches the requirements.
    async function(req, username, password, done) {

        try {

            req.res.set('Cache-Control', 'no-store');

            const duplicateUser = await User.findOne({ where: { username: username } });

            /* In this route, the signup process can fail if the username is a duplicate, or if the username
            contains characters other than letters and numbers, or if the email fails the associated regular
            expression.*/
            if (duplicateUser) {

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

            if(email){

                let emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
                let validEmail = emailRegex.test(email);
    
                if(!validEmail){

                    console.log("inside");
                    
                    req.res.redirect('/signup?invalidEmail=true');

                    return done(null, false, { message: 'Email must be in the format test@example.com.' });
                }
            }

            let salt = uuidv4();
            let hashedPassword = await hashSinglePassword(password, salt, "creation");

            // If the username and email both pass the checks, a new user is created.
             const user = await User.create(
                
                {
                    username: username,
                    email: email,
                    password: hashedPassword,
                    salt: salt
                }
            );

            req.loggedInUser = user; 

            return done(null, user);

        } catch (err) {

            console.log(err);
        }
    }         
));

module.exports = passport;
