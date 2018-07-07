import passport from 'passport'
import jwt from 'jsonwebtoken'
import { ER_JWT_SECRET } from '../config/env'
import { AccessControl } from 'accesscontrol'

// Check if user is authenticated
// exports.checkAuth = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.status(401).send(`Tienes que estar autenticado para
//   acceder a éste recurso`)
// }

/**
 * Validate token
 */

exports.authorize = (req, res, next) => {
  passport.authenticate('jwt', { session: false })(req, res, next)
}

/**
 * Authorize routes resources
 */

exports.hasRole = function (roleNeeded) {
  return function (req, res, next) {
    // Token Extraction
    let token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null
    let userToken = jwt.verify(token, ER_JWT_SECRET)

    if (token && userToken.role === roleNeeded) {
      next()
    } else {
      return res.status(401).json({ msg: 'Unauthorized.' })
    }
  }
}

/**
 * Check Permissions:
 * Usage of library recommended. ABAC implementation
 * for permissions with database policies extraction
 * compatibility.
 */

/**
 * Cause' of time constraint, this is left as a TO-DO,
 * since the database for MPM (original proyect of this
 * repo), already meet the criteria to be used whitout it.
 */

// https://github.com/onury/accesscontrol
