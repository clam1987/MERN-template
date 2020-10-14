const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  db = require("../models"),
  { User } = db;

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, async (err, user) => {
      try {
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (!(await user.verifyPassword(password))) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      } catch {
        console.error(err);
      }
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
