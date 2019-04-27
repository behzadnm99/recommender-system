import mongoose from 'mongoose';
import passport from 'passport';
import LocalStrategy from 'passport-local';

const Users = mongoose.model('user');

passport.use(new LocalStrategy({
  usernameField: 'user[username]',
  passwordField: 'user[password]',
}, (username, password, done) => {
  Users.findOne({ username })
    .then((user) => {
      if(!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }

      return done(null, user);
    }).catch(done);
}));