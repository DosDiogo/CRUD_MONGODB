const auth = require("./auth");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

module.exports = (passport) => {
    
    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password",        

    }, async (username, password, done) =>{
        try {
            const user = auth.findUserByEmail(username);

            if(!user) return done(null, false);                       

            if(!bcrypt.compareSync(password, user.password)) 
                return done(null, false);
            else
                return done(null, user);

        } catch (err) {
            
            return done(err, false);
        }
    }))

}