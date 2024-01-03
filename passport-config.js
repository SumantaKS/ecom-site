const localStrategy = require("passport-local").Strategy;
const crypt = require("bcrypt");

function init(passport, getUser, getUserById) {
  const authenticate = async (email, password, done) => {
    const user = getUser(email);
    if (user == null) {
      return done(null, false, { message: "User not found. Sign UP to join" });
    }
    try {
      if (await crypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, {
          message: "Incorrect Password. Please try again!",
        });
      }
    } catch (e) {
      return done(e);
    }
  };
  passport.use(new localStrategy({ usernameField: "email" }, authenticate));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });
}

module.exports = init;
