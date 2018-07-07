'use strict'

import nodemailer from 'nodemailer'

const Request = require('../models/Requests.js')
const Addressee = require('../models/Addressees.js')

function GetRequest (req, res) {
  let id = req.params.id

  Request.findById(id, (err, request) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
    }
    if (!request) {
      return res.status(404).send({ message: 'El elemento no existe en la base de datos.' })
    }

    res.status(200).send({ request: request })
  })
}

function GetRequests (req, res) {
  Request.find({}, (err, requests) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
    }

    res.status(200).send({ requests: requests })
  })
}

function NewRequest (req, res) {
  let request = new Request()

  request.type = req.body.type
  request.emitter.id = req.body.emitter.id
  request.emitter.name = req.body.emitter.name
  request.emitter.date = (new Date())
  request.message = req.body.message
  request.subject = req.body.subject
  request.status = req.body.status
  request.response = req.body.response
  request.updated = req.body.updated

  request.save((err, requestStored) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al intentar guardar los datos en la base de datos. ' + err })
    }

    Addressee.findOne({ name: req.body.type }, (err, address) => {
      if (err) return res.status(500).send({ message: 'Ha ocurrido un error al intentar guardar los datos en la base de datos. ' + err })
      if (address.email) {
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'intranetmpm@gmail.com',
            pass: 'hWOEdrATHrOWELeNEighTCHEAtionEyeRBanUoDIet'
          }
        })
        transporter.sendMail({
          from: 'intranetmpm@gmail.com',
          to: address.email,
          subject: 'Nueva solicitud: ' + request.type,
          html: `<h3>Asunto: ${request.subject}</h3>
          <p><strong>Mensaje: </strong>${request.message}</p>`
        }, (error, info) => {
          if (error) {
            return res.status(500).send({ message: 'Ha ocurrido un error al intentar enviar el e-mail. ' + error })
          } else {
            res.status(200).send({ request: requestStored })
          }
        })
      }
    })
  })
}

function UpdateRequest (req, res) {
  let id = req.params.id
  let body = req.body

  Request.findByIdAndUpdate(id, body, (err, requestUpdated) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al intentar actualizar un elemento de la base de datos. ' + err })
    }

    res.status(200).send({ request: requestUpdated })
  })
}

function DeleteRequest (req, res) {
  let id = req.params.id

  Request.findById(id, (err, request) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al intentar borrar un elemento de la base de datos. ' + err })
    }

    request.remove(err => {
      if (err) {
        return res.status(500).send({ message: 'Ha ocurrido un error al intentar borrar un elemento de la base de datos. ' + err })
      }

      res.status(200).send({ message: 'El elemento ha sido borrado' })
    })
  })
}

module.exports = {
  GetRequest,
  GetRequests,
  NewRequest,
  UpdateRequest,
  DeleteRequest
}
