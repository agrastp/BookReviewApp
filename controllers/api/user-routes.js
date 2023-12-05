const router = require('express').Router();
//const { User } = require('../../models');
const passport = require('../../utils/authentication-for-login.js');
const passport2 = require('../../utils/authentication-for-signup.js');
const bcrypt = require('bcrypt');
const { sessionSaveWithPromise } = require('../../utils/session-promise-functions.js');
//const crypto = require('crypto');


// CREATE new user
router.post('/signup', passport2.authenticate('signup'), async (req, res) => {
    try {

            if(req.invalidUsername === "true"){

            res.redirect('/signup?invalidUsername=true');

        } else if(req.duplicateUser === "true"){

            res.redirect('/signup?duplicateUser=true');

        } else if(req.loggedInUser){

            req.session.loggedInUser = req.loggedInUser
            await sessionSaveWithPromise(req);

            res.redirect('/dashboard');
        }
        // const dbUserData = await User.create({
        //   username: req.body.username,
        //   email: req.body.email,
        //   password: req.body.password,
        // });

        // // Set up sessions with a 'loggedIn' variable set to `true`
        // req.session.save(() => {
        //   req.session.loggedIn = true;
        //   req.session.loggedInUsername = req.body.username;

        //   res.status(200).json(dbUserData);
        // });
    } catch (err) {

        console.log(err);
        res.status(500).json(err);
    }
});



// Login
router.post('/login', passport.authenticate('login'), async  (req, res) => {

    try {

        if(req.invalidCredentials === "true"){

            res.redirect('/login?valid=false');

        } else if(req.loggedInUser){

            req.session.loggedInUser = req.loggedInUser
            await sessionSaveWithPromise(req);

            res.redirect('/dashboard');
        }

    } catch (error) {

        console.log(error);
        res.status(500).json(error);
    }
});

// Logout
router.get('/logout', (req, res) => {

  // When the user logs out, destroy the session
  res.set('Cache-Control', 'no-store');

  req.session.loggedInUser

  if (req.session.loggedInUser) {

    req.session.destroy(() => {

        res.redirect(301, '/login');
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;