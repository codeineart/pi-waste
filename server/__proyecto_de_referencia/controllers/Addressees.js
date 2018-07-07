'use strict'

const Addressee = require('../models/Addressees.js')

function GetAddressees (req, res) {
  // Devuelve los nombres y correos electrónicos de los destinatarios de Soporte y Solicitudes.
  //   Llamada: addressee/modificador
  //   Ejemplo: addressee/soporte
  //
  //   Modificadores:
  //
  //     'soporte': obtiene los destinatarios de Soporte.
  //     'solicitud': obtiene los destinatarios de Solicitudes.

  let modificador = req.params.modificador

  switch (modificador) {
    case 'soporte':
      Addressee.find({ type: 'soporte' }, (err, soporte) => {
        if (err) {
          return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
        }

        res.status(200).send({ soporte: soporte})
      })
        .sort({ 'name': 1 })
      break

    case 'solicitud':
      Addressee.find({ type: 'solicitud' }, (err, solicitud) => {
        if (err) {
          return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
        }

        res.status(200).send({ solicitud: solicitud})
      })
        .sort({ 'name': 1 })
      break
  }
}

function UpdateAddreesse (req, res) {
  let id = req.params.id
  let body = req.body

  Addressee.findByIdAndUpdate(id, body, (err, addresseeUpdated) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al intentar actualizar un elemento de la base de datos. ' + err })
    }

    res.status(200).send({ addressee: addresseeUpdated })
  })
}

module.exports = {
  GetAddressees,
  UpdateAddreesse
}
