'use strict'

const Info = require('../models/Info.js')

function GetInfo (req, res) {
  let docType = req.params.doc_type

  Info.find({ doc_type: docType }, (err, info) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
    }
    if (!info) {
      return res.status(404).send({ message: 'El elemento no existe en la base de datos.' })
    }

    res.status(200).send({ info: info })
  })
}

function NewInfo (req, res) {
  let info = new Info()

  info.doc_type = req.body.doc_type
  info.meta.title = req.body.meta.title
  info.meta.content = req.body.meta.content
  info.meta.col = req.body.meta.col
  info.meta.row = req.body.meta.row
  info.meta.list = req.body.meta.list
  info.meta.images_url = req.body.meta.images_url

  info.save((err, infoStored) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al intentar guardar los datos en la base de datos. ' + err })
    }

    res.status(200).send({ info: infoStored })
  })
}

function UpdateInfo (req, res) {
  let docType = req.params.doc_type
  let body = req.body

  Info.findOneAndUpdate({ doc_type: docType }, body, (err, infoUpdated) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al intentar actualizar un elemento de la base de datos. ' + err })
    }

    res.status(200).send({ info: infoUpdated })
  })
}

function DeleteInfo (req, res) {
  let docType = req.params.doc_type

  Info.findOne({ doc_type: docType }, (err, info) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al intentar borrar un elemento de la base de datos. ' + err })
    }

    info.remove(err => {
      if (err) {
        return res.status(500).send({ message: 'Ha ocurrido un error al intentar borrar un elemento de la base de datos. ' + err })
      }

      res.status(200).send({ message: 'El elemento ha sido borrado' })
    })
  })
}

module.exports = {
  GetInfo,
  NewInfo,
  UpdateInfo,
  DeleteInfo
}
