
/* If the user isn't authenticated, this method redirects the user to the login page.*/
function baseAuthenticateWhetherLoggedIn(req, res, next){

    //The isAuthenticated method is implemented by Passport.
    if (req.isAuthenticated()) {

        next();

    } else {

        res.redirect('/login');
    }
}

module.exports = baseAuthenticateWhetherLoggedIn;