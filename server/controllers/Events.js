'use strict'
const jwt = require('jsonwebtoken')
const ER_JWT_SECRET = require('../config/env').ER_JWT_SECRET
const Event = require('../models/Events.js')
let ObjectId = require('mongoose').Types.ObjectId

function GetEvent (req, res) {
  // Devuelve los eventos. Utiliza un modificador y parámetros para determinar qué documentos obtener.
  //   Llamada: event/modificador?parámetros
  //   Ejemplo: event/obtenerTodo
  //
  //   Modificadores:
  //
  //     'obtenerTodo': obtiene todos los documentos de los eventos y de cualquier tipo de evento.
  //     'obtenerAgenda' ? numMes & numAno: obtiene los eventos de tipo Agenda para el mes (valores de 0 a 11) y año especificados.
  //     'obtenerPorId' ? id: obtiene un evento especificado en el parámetro id.

  /**
   * Extracción de información del token JWT
   */
  let signaturePayload
  let modificador
  let token

  // Extrae el token desde la cabecera del request
  token = req.headers.authorization

  // Revisa que el token esté OK
  if (token == null) {
    return res.status(403).send({
      message: 'Token de autorización no encontrado en cabeceras.'
    })
  } else {
    // Guarda la decodificación del token
    // para su uso
    signaturePayload = jwt.decode(token)
    // Extrae el parámetro modificador para
    // el enrutamiento del request GET
    modificador = req.params.modificador
  }

  // Query modifier

  switch (modificador) {
    case 'obtenerTodo':
      Event.find(
        {
          $or: [
            {
              type: 'global'
            },
            {
              'creator.ref': signaturePayload._id,
              type: 'personal'
            }
          ]
        },
        (err, events) => {
          if (err) {
            return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
          }

          return res.status(200).send({ events: events })
        }
      )
      break

    case 'obtenerAgendaPorMesAno':
      let mes = req.query.numMes
      let ano = req.query.numAno
      let fechaInicio = new Date(ano, mes, '1')
      let fechaFin = new Date(ano, Number(mes) + 1, 0)

      Event.find({ type: 'agenda', date: { $gte: fechaInicio, $lte: fechaFin } }, (err, events) => {
        if (err) {
          return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
        }

        res.status(200).send({ events: events })
      })
      break

    case 'obtenerPorId':
      let id = req.query.id

      Event.findById(id, (err, event) => {
        if (err) {
          return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
        }
        if (!event) {
          return res.status(404).send({ message: 'El elemento no existe en la base de datos.' })
        }

        res.status(200).send({ event: event })
      })
      break
    default:
      return res.status(404).send({ message: 'Recurso no encontrado' })
      break
  }
}

function NewEvent (req, res) {
  console.log(req.body)

  let event = new Event()

  event.creator.name = req.body.creator.name
  event.creator.ref = req.body.creator.ref
  event.title = req.body.title
  event.details = req.body.details
  event.created = req.body.created
  event.type = req.body.type
  event.event.allDay = req.body.event.allDay
  event.event.start = req.body.event.start
  event.event.end = req.body.event.end

  event.save((err, eventStored) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al intentar guardar los datos en la base de datos. ' + err })
    }

    res.status(200).send({ event: eventStored })
  })
}

function UpdateEvent (req, res) {
  let id = req.params.id
  let body = req.body

  Event.findByIdAndUpdate(id, body, (err, eventUpdated) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al intentar actualizar un elemento de la base de datos. ' + err })
    }

    res.status(200).send({ event: eventUpdated })
  })
}

function DeleteEvent (req, res) {
  let id = req.params.id

  Event.findById(id, (err, event) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al intentar borrar un elemento de la base de datos. ' + err })
    }

    event.remove(err => {
      if (err) {
        return res.status(500).send({ message: 'Ha ocurrido un error al intentar borrar un elemento de la base de datos. ' + err })
      }

      res.status(200).send({ message: 'El elemento ha sido borrado' })
    })
  })
}

module.exports = {
  GetEvent,
  NewEvent,
  UpdateEvent,
  DeleteEvent
}
