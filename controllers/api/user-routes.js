const router = require('express').Router();
const { User } = require('../../models');
const passport = require('../../utils/authentication.js')
const bcrypt = require('bcrypt');
const { sessionSaveWithPromise } = require('../../utils/session-promise-functions.js');
//const crypto = require('crypto');


// CREATE new user
router.post('/signup', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // Set up sessions with a 'loggedIn' variable set to `true`
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.loggedInUsername = req.body.username;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



// Login
router.post('/login', passport.authenticate('local'), async  (req, res) => {

if(req.nullField === true){

    res.redirect('/login?field=null');

} else if(req.invalidCredentials === true){

    res.redirect('/login?valid=false');

} else if(req.loggedInUser){

    req.session.loggedInUser = req.loggedInUser
    await sessionSaveWithPromise(req);

    res.redirect('/dashboard');
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