const passport = require('passport')
const User = require('../models/Users')
const SysConfig = require('../models/SysConfig')
const jwt = require('jsonwebtoken')
const ER_JWT_SECRET = require('../config/env').ER_JWT_SECRET

// COMMONJS SYNTAX
module.exports = {
  test: function (req, res) {
    let info = (req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1)
    res.set('Content-Type', 'text/html')
    res.send(`<h1>Embodied Reports testing endpoints ${req.session.cuenta}</h1>`)
  },
  callback: function (req, res) {
    res.set('Content-Type', 'text/html')
    res.send(`<h1>Callback_1</h1>`)
  },
  callback_2: function (req, res) {
    res.set('Content-Type', 'text/html')
    res.send(`<h1>Callback_2</h1>`)
  },
  /**
   * getModules
   * Obtiene el patrón de módulos disponibles
   * según el usuario decodificado desde el token
   * JWT enviado. Ésto sirve para segmentar los
   * módulos disponibles según el tipo de usuario.
   */
  getModules: function (req, res) {
    return res.status(200).json({
      user: 'Policarpo',
      modules: [
        {
          id: 'UserManager',
          name: 'Gestión de usuarios',
          icon: 'person'
        },
        {
          id: 'News',
          name: 'Noticias',
          icon: 'description'
        },
        {
          id: 'Comite',
          name: 'Comité Paritario',
          icon: 'people'
        },
        {
          id: 'Estructura',
          name: 'Estructura Organizacional',
          icon: 'people'
        },
        {
          id: 'Videos',
          name: 'Videos',
          icon: 'ondemand_video'
        },
        {
          id: 'Archivos',
          name: 'Archivos',
          icon: 'folder_shared'
        },
        {
          id: 'Destinatario',
          name: 'Destinatarios',
          icon: 'mail'
        },
        {
          id: 'CorreoMasivo',
          name: 'Correo masivo',
          icon: 'alternate_email'
        }
      ]
    })
  },
  createUser: function (req, res, next) {
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
    console.log('Hit')
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
        name: req.body.area.name
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
        req.logIn(newUser, err => {
          return res.status(200).json({ msg: 'Usuario creado satisfactoriamente.' })
        })
      })
    })
  }
}
