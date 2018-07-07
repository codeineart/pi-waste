'use strict'

const Video = require('../models/Videos.js')

function GetVideo (req, res) {
  let id = req.params.id

  Video.findById(id, (err, video) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
    }
    if (!video) {
      return res.status(404).send({ message: 'El elemento no existe en la base de datos.' })
    }

    res.status(200).send({ video: video })
  })
}

function GetVideos (req, res) {
  Video.find({}, (err, videos) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
    }

    res.status(200).send({ videos: videos })
  })
}

function NewVideo (req, res) {
  let video = new Video()

  video.name = req.body.name
  video.description = req.body.description
  video.type = req.body.type
  video.thumbnail = req.body.thumbnail
  video.creator.id = req.body.creator.id
  video.creator.name = req.body.creator.name
  video.creator.date = req.body.creator.date
  video.tags = req.body.tags
  video.url = req.body.url

  video.save((err, videoStored) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al intentar guardar los datos en la base de datos. ' + err })
    }

    res.status(200).send({ video: videoStored })
  })
}

function UpdateVideo (req, res) {
  let id = req.params.id
  let body = req.body

  Video.findByIdAndUpdate(id, body, (err, videoUpdated) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al intentar actualizar un elemento de la base de datos. ' + err })
    }

    res.status(200).send({ video: videoUpdated })
  })
}

function DeleteVideo (req, res) {
  let id = req.params.id

  Video.findById(id, (err, video) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al intentar borrar un elemento de la base de datos. ' + err })
    }

    video.remove(err => {
      if (err) {
        return res.status(500).send({ message: 'Ha ocurrido un error al intentar borrar un elemento de la base de datos. ' + err })
      }

      res.status(200).send({ message: 'El elemento ha sido borrado' })
    })
  })
}

module.exports = {
  GetVideo,
  GetVideos,
  NewVideo,
  UpdateVideo,
  DeleteVideo
}
