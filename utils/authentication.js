const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function passportFindUser(){

    passport.use(new LocalStrategy(

        function(username, done) {

            User.findOne({ username: username }, function (err, user) {

                if (err) { 
                
                    done(err); 
                    next();
                }

                if (!user) { 
                
                    done(null, false); 
                    next();
                }

                if (!user.verifyPassword(password)) { 
                    
                    done(null, false); 
                }

                done(null, user);
          });
        }
    ));
}



