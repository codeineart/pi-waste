'use strict'

const Project = require('../models/Projects.js')

function GetProject (req, res) {
  let id = req.params.id

  Project.findById(id, (err, project) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
    }
    if (!project) {
      return res.status(404).send({ message: 'El elemento no existe en la base de datos.' })
    }

    res.status(200).send({ project: project })
  })
}

function GetProjects (req, res) {
  Project.find({}, (err, projects) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
    }

    res.status(200).send({ projects: projects })
  })
}

function NewProject (req, res) {
  let proyecto = new Project()

  proyecto.contract = req.body.contract
  proyecto.name = req.body.name
  proyecto.date = req.body.date
  proyecto.description = req.body.description
  proyecto.cover_img_url = req.body.cover_img_url
  proyecto.gal_img_url = req.body.gal_img_url

  proyecto.save((err, projectStored) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al intentar guardar los datos en la base de datos. ' + err })
    }

    res.status(200).send({ proyect: projectStored })
  })
}

function UpdateProject (req, res) {
  let id = req.params.id
  let body = req.body

  Project.findByIdAndUpdate(id, body, (err, projectUpdated) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al intentar actualizar un elemento de la base de datos. ' + err })
    }

    res.status(200).send({ project: projectUpdated })
  })
}

function DeleteProject (req, res) {
  let id = req.params.id

  Project.findById(id, (err, project) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al intentar borrar un elemento de la base de datos. ' + err })
    }

    project.remove(err => {
      if (err) {
        return res.status(500).send({ message: 'Ha ocurrido un error al intentar borrar un elemento de la base de datos. ' + err })
      }

      res.status(200).send({ message: 'El elemento ha sido borrado' })
    })
  })
}

module.exports = {
  GetProject,
  GetProjects,
  NewProject,
  UpdateProject,
  DeleteProject
}
