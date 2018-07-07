'use strict'

const News = require('../models/News')
const Info = require('../models/Info')
const Project = require('../models/Projects')
const Event = require('../models/Events')
const User = require('../models/Users')
const Video = require('../models/Videos')

const NUM_NEWS = 4 // Constante para definir cuántos documentos de noticias obtener.
const NUM_PROJECTS = 3 // Constante para definir cuántos documentos de proyectos obtener.
const NUM_EVENTS = 6 // Constante para definir cuántos documentos de eventos obtener.
const NUM_VIDEOS = 4 // Constante para definir cuántos documentos de videos obtener.

let home = {} // Objeto con la respuesta a devolver.
let documentosNoticias = {}
let documentosMisionVision = {}
let documentosProyectos = {}
let documentosEventos = {}
let documentosCumpleanos = {}
let documentosDirectorio = {}
let documentosVideos = {}
let documentosOrganigrama = {}
let documentosMision = {}
let documentosVision = {}
let documentosPeerCommittee = {}

function GetHome (req, res) {
  // Devuelve los documentos de distintas colecciones de la BD para poblar el Home. Utiliza un modificador y parámetros para determinar qué documentos obtener.
  //   Llamada: home/modificador?parámetros
  //   Ejemplo: home/obtenerCumpleanos?numMes=0
  //
  //   Modificadores:
  //
  //     'obtenerHome': obtiene los documentos de todas las colecciones del Home.
  //     'obtenerCumpleanos' ? numMes: obtiene los datos de los usuarios que están de cumpleaños dentro del mes indicado en numMes (valores de 0 a 11).

  let fechaActual = new Date()
  let modificador = req.params.modificador

  switch (modificador) {
    case 'obtenerHome':
      // Obtener News.

      News.find({}, { title: 1, content: 1, cover_url: 1, 'creator.date': 1 }, (err, noticias) => {
        if (err) {
          return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
        }
        documentosNoticias = { news: noticias }
      })
        .limit(NUM_NEWS)
        .sort({ 'creator.date': 1 })

      // Obtener misión-visión.
      Info.find({ doc_type: 'mission_vision' }, { 'meta.title': 1, 'meta.content': 1 }, (err, misionVision) => {
        if (err) {
          return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
        }

        documentosMisionVision = { missionVision: misionVision }
      })

      // Obtener misión.
      Info.find({ doc_type: 'mision' }, { 'meta.title': 1, 'meta.content': 1 }, (err, mision) => {
        if (err) {
          return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
        }

        documentosMision = { mision: mision }
      })

      // Obtener visión.
      Info.find({ doc_type: 'vision' }, { 'meta.title': 1, 'meta.content': 1 }, (err, vision) => {
        if (err) {
          return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
        }

        documentosVision = { vision: vision }
      })

      // Obtener proyectos.
      Project.find({}, { name: 1, cover_img_url: 1 }, (err, proyectos) => {
        if (err) {
          return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
        }

        documentosProyectos = { projects: proyectos }
      })
        .limit(NUM_PROJECTS)
        .sort({ date: 1 })

      // Obtener eventos.
      Event.find({ type: { $in: ['personal', 'global'] } }, { title: 1, details: 1, event: 1 }, (err, eventos) => {
        if (err) {
          return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
        }

        documentosEventos = { events: eventos }
      })
        .limit(NUM_EVENTS)
        .sort({ date: 1 })

      // Obtener cumpleaños.
      fechaActual = new Date()

      User.find({}, { name: 1, born: 1, photography_url: 1, position: 1 }, (err, cumpleanos) => {
        if (err) {
          return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
        }

        // Filtrar aquellos documentos cuyo mes de la fecha de nacimiento sea igual al mes actual.
        // let cumpleaneros = cumpleanos.filter(documento => documento.born.getMonth() === fechaActual.getMonth())

        documentosCumpleanos = { birthday: cumpleanos.map(documento => documento) }
      }).sort({ born: 1 })

      // Obtener directorio.
      User.find({}, { name: 1, 'phone.mobile': 1, 'phone.annex': 1, email: 1, position: 1 }, (err, directorio) => {
        if (err) {
          return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
        }

        documentosDirectorio = { phoneDirectory: directorio }
      }).sort({ name: 1 })

      // Obtener videos.
      Video.find({}, {}, (err, videos) => {
        if (err) {
          return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
        }

        documentosVideos = { videos: videos }
      })
        .limit(NUM_VIDEOS)
        .sort({ 'creator.date': 1 })

      // Obtener organigrama.
      Info.find({ doc_type: 'organization_chart' }, { 'meta.title': 1, 'meta.content': 1, 'meta.col': 1, 'meta.row': 1, images_url: 1, 'meta.avatar_url': 1 }, (err, organizationChart) => {
        if (err) {
          return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
        }

        documentosOrganigrama = { organizationChart: organizationChart }
      }).sort({ row: 1, col: 1 })

      // Obtener comité paritario
      Info.find({ doc_type: 'peer_committee' }, (err, peerCommittee) => {
        if (err) {
          return res.status(500).send({
            message: 'Ha ocurrido un error al consultar la base de datos. ' + err
          })
        }
        documentosPeerCommittee = { peerCommittee: peerCommittee }
      })

      res.status(200).send(Object.assign(home, documentosNoticias, documentosMisionVision, documentosMision, documentosVision, documentosProyectos, documentosEventos, documentosCumpleanos, documentosDirectorio, documentosVideos, documentosOrganigrama, documentosPeerCommittee))
      break

    case 'obtenerCumpleanos':
      let mes = req.query.numMes
      fechaActual = new Date()
      fechaActual.setMonth(mes)

      User.find({}, { name: 1, born: 1, photography_url: 1, position: 1 }, (err, cumpleanos) => {
        if (err) {
          return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
        }

        // Filtrar aquellos documentos cuyo mes de la fecha de nacimiento sea igual al mes dado como parámetro.
        let cumpleaneros = cumpleanos.filter(documento => documento.born.getMonth() === fechaActual.getMonth())

        res.status(200).send({ birthday: cumpleaneros })
      }).sort({ born: 1 })
      break
  }
}

module.exports = {
  GetHome
}
