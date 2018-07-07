'use strict'

const Position = require('../models/Positions.js')

function GetPosition (req, res) {
  let id = req.params.id

  Position.findById(id, (err, position) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
    }
    if (!position) {
      return res.status(404).send({ message: 'El elemento no existe en la base de datos.' })
    }

    res.status(200).send({ position: position })
  })
}

function GetPositions (req, res) {
  Position.find({}, (err, positions) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
    }

    res.status(200).send({ positions: positions })
  })
}

function NewPosition (req, res) {
  let position = new Position()

  position.position = req.body.position

  position.save((err, positionStored) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al intentar guardar los datos en la base de datos. ' + err })
    }

    res.status(200).send({ position: positionStored })
  })
}

function UpdatePosition (req, res) {
  let id = req.params.id
  let body = req.body

  Position.findByIdAndUpdate(id, body, (err, positionUpdated) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al intentar actualizar un elemento de la base de datos. ' + err })
    }

    res.status(200).send({ position: positionUpdated })
  })
}

function DeletePosition (req, res) {
  let id = req.params.id

  Position.findById(id, (err, position) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al intentar borrar un elemento de la base de datos. ' + err })
    }

    position.remove(err => {
      if (err) {
        return res.status(500).send({ message: 'Ha ocurrido un error al intentar borrar un elemento de la base de datos. ' + err })
      }

      res.status(200).send({ message: 'El elemento ha sido borrado' })
    })
  })
}

module.exports = {
  GetPosition,
  GetPositions,
  NewPosition,
  UpdatePosition,
  DeletePosition
}
