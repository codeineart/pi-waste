'use strict'

const User = require('../models/Users')

function GetUser (req, res) {
  // Devuelve los documentos de la colección Users. Utiliza un modificador para determinar qué documentos obtener.
  //   Llamada: user/modificador
  //   Ejemplo: user/obtenerDirectorio
  //
  //   Modificadores:
  //
  //     'obtenerDirectorio': obtiene los datos para formar el directorio telefónico de todos los usuarios.

  let modificador = req.params.modificador

  switch (modificador) {
    case 'obtenerDirectorio':
      User.find({}, { name: 1, 'phone.mobile': 1, 'phone.annex': 1, email: 1, position: 1 }, (err, directorio) => {
        if (err) {
          return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
        }
        return res.status(200).send({ phoneDirectory: directorio })
      }).sort({ name: 1 })
      break
  }
}

function NewUser (req, res) {
  let usuario = new User()

  usuario.rut = req.body.rut
  usuario.name = req.body.name
  usuario.username = req.body.username
  usuario.password = req.body.password
  usuario.born = req.body.born
  usuario.email = req.body.email
  usuario.phone.mobile = req.body.phone.mobile
  usuario.phone.annex = req.body.phone.annex
  usuario.position = req.body.position
  usuario.id_contract = req.body.id_contract
  usuario.area.id = req.body.area.id
  usuario.area.name = req.body.area.name
  usuario.rol = req.body.rol
  usuario.permits = req.body.permits
  usuario.new_user = req.body.new_user
  usuario.created = req.body.created

  usuario.save((err, userStored) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al intentar guardar los datos en la base de datos. ' + err })
    }

    res.status(200).send({ user: userStored })
  })
}

module.exports = {
  GetUser,
  NewUser
}
