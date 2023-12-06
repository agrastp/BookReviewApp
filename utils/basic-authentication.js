
/* I, Gabriel, basically took this function from activity 20 of module 14.  If the user isn't authenticated, it
redirects him or her to the login page.*/
function baseAuthenticateWhetherLoggedIn(req, res, next){

    if (!req.session.loggedInUser) {

        res.redirect('/login');

    } else {

        next();
    }
}

module.exports = baseAuthenticateWhetherLoggedIn;