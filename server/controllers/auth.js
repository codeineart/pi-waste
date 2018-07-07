const passport = require('passport')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const ER_JWT_SECRET = require('../config/env').ER_JWT_SECRET

/**********************************************************
 *                 AUTH PROCESSING JWT                    *
 **********************************************************/

/* GET LOGOUT [DEPRECATED, used for sessions]
exports.logout = (req, res) => {
req.logout()  // Session stuff?
res.status(200).json({msg:'Logout exitoso'})
} */

/**
 * Login POST
 */
exports.postLogin = (req, res, next) => {
  console.log(req.body)
  passport.authenticate('local', { session: false }, (err, user, info) => {
    console.log(info)

    if (err) {
      next(err)
    }

    if (!user) {
      return res.status(401).json({ msg: 'email o contraseña no válidos' })
    }
    req.logIn(user, { session: false }, err => {
      if (err) {
        next(err)
      }
      // (...).sign(payload, secret, [options, callback])
      const token = jwt.sign(user.toJSON(), ER_JWT_SECRET, {
        expiresIn: '1200000000000000000' // Just able to use app for 1 minute
      })

      console.log('Login Exitoso')
      return res.status(200).json({ msg: 'Login exitoso', token })
    })
  })(req, res, next)
}

/**
 * Guardia de navegación. Confirma el token JWT
 * desde el cliente al avanzar a través de rutas
 * en la aplicación.
 */
exports.checkToken = (req, res, next) => {
  console.log('Extracting token...')

  let token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null

  console.log('Validating auth token...\n', token)

  jwt.verify(token, ER_JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('Invalid token')

      return res.status(401).json({ msg: 'Unauthorized.' })

      // Below can be used in production context
      // return res.redirect(301, 'http://localhost:8080/login')
      // return res.redirect(301, '/login')
    }
    console.log('Valid Token')
    console.log(decoded)
    return res.status(200).json({ msg: 'Token validated. Access Granted' })
  })
}

/**********************************************************
 *                                                        *
 *                 USERS CRUD OPERATIONS                  *
 *                                                        *
 **********************************************************/

/**
 * Master user dashboard controllers
 * To-Do:
 * - Extract Token info
 * - Check permission for resource
 */

/**
 * Método: GET
 * Descripcion: Extrae usuario en base al id
 * entregado por parte del cliente.
 */
exports.getUser = (req, res) => {
  let id = req.params.id

  User.findById(id, (err, userFound) => {
    if (err) {
      return res.status(500).json({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
    }
    // add permission check
    if (!userFound) {
      return res.status(404).json({ message: 'El elemento no existe en la base de datos.' })
    }

    res.status(200).json({
      user: userFound
    })
  })
}

/**
 * Método: GET
 * Descripcion: Extrae todos los usuarios
 * listados en la base de datos
 */
exports.getUsers = (req, res) => {
  User.find({}, (err, usersFound) => {
    if (err) {
      return res.status(500).json({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
    }

    res.status(200).json({ users: usersFound })
  })
}

/**
 * Método: POST
 * Descripcion: Crea un usuario en base a
 * parámetros enviados por el cliente.
 */
exports.createUser = (req, res) => {
  /**
   * To-Do:
   * - Validar rut
   * - Verificar llave única rut en DB
   * - Validar fecha de nacimiento
   * - validar formato de teléfono y anexo
   * - Validar posición
   * - Validar contrato (si corresponde)
   * - Extraer y filtrar área (si corresponde), junto con su nombre
   * - Validar rol dentro de opciones disponibles
   * - Procesar arreglo y validar existencia de permisos
   */
  console.log(req.body)
  const newUser = new User({
    rut: req.body.rut,
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    born: req.body.born,
    phone: {
      mobile: req.body.phone.mobile,
      annex: req.body.phone.annex
    },
    position: req.body.position,
    contract: req.body.contract,
    area: {
      _id: null,
      name: req.body.areaName
    },
    role: req.body.role,
    permits: req.body.permits
  })

  // Log new user
  console.log(newUser)

  User.findOne({ username: req.body.username }, (err, userFound) => {
    if (userFound) {
      return res.status(400).json({ msg: 'Usuario ya registrado.' })
    }
    newUser.save(err => {
      if (err) {
        return res.status(409).json({ msg: err })
      }
      return res.status(200).json({ msg: 'Usuario creado con éxito.' })
    })
  })
}

/**
 * Método: POST
 * Descripción: Modifica un usuario existente
 * en base a su _id
 */
exports.updateUser = (req, res) => {
  let id = req.body._id
  let body = req.body

  User.findByIdAndUpdate(id, body, { new: true }, (err, updatedUser) => {
    if (err) {
      return res.status(500).json({ message: 'Ha ocurrido un error al intentar actualizar un elemento de la base de datos. ' + err })
    }
    res.status(200).json({ updatedDocument: updatedUser })
  })
}

/**
 * Método: POST
 * Descripción: Elimina el usuario en base al _id
 * del usuario.
 */
exports.deleteUser = (req, res) => {
  let id = req.body._id

  User.findById(id, (err, userFound) => {
    if (!userFound) {
      return res.status(500).json({
        message: 'Recurso no encontrado.'
      })
    }

    if (err) {
      return res.status(500).json({
        message: `Ha ocurrido un error al intentar borrar un elemento de la base de datos.` + err
      })
    }

    userFound.remove(err => {
      if (err) {
        return res.status(500).json({ message: 'Ha ocurrido un error al intentar borrar un elemento de la base de datos. ' + err })
      }

      res.status(200).json({ message: 'El elemento ha sido borrado' })
    })
  })
}
