const User = require('../models/Users')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const ER_JWT_SECRET = require('./env').ER_JWT_SECRET

/**
FOR USSAGE WITH SESSIONS
*/
// passport.serializeUser((user, done) => {
//   done(null, usuario._id)
// })
//
// passport.deserializeUser((id, done) => {
//   Usuario.findById(id, (err, user) => {
//     done(err, user)
//   })
// })

/**
LOCAL ESTRATEGY AUTH: AUTHENTIFICATION

usage (on login route) :
passport.authenticate('local', { session: false }, (err, payload, info) => {
  callback stuff here
  })

done() signature:
done(error, payload, info{})
*/
passport.use(
  new LocalStrategy(
    // gets data from the request
    { usernameField: 'email' },
    (username, password, done) => {
      User.findOne({ username }, (err, user) => {
        if (!user) {
          return done(null, false, { message: `User ${username} not on database.` })
        } else {
          user.compararPassword(password, (err, sonIguales) => {
            if (sonIguales) {
              return done(null, user)
            } else {
              return done(null, false, { message: `Wrong password for ${username}` })
            }
          })
        }
      })
    }
  )
)

/**
JWT STRATEGY AUTH: AUTHORIZATION
*/

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: ER_JWT_SECRET
    },
    function (jwtPayload, cb) {
      console.log('Inside Strategy')
      console.log('Jwt Payload:' + jwtPayload)
      console.log(jwtPayload)
      return cb(null, jwtPayload)
    }
  )
)
