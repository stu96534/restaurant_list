const passport = require('passport')
const Localstrategy = require('passport-local').Strategy
const User = require('../models/user')



module.exports = app => {

  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new Localstrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) { return done(null, false) }

        if (!user.password !== password) { return done(null, false) }

        return done(null, user)
      })
      .catch(err => done(err, false))
  }

  ))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
    .lean()
    .then(user => done(null, user))
    .catch(err => done(err, null))
  })
}