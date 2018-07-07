'use strict'

const Info = require('../models/Info.js')
const DOC_TYPE = 'organization_chart'

function GetOrganizationChartMember (req, res) {
  let id = req.params.id

  Info.findById(id, (err, member) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
    }
    if (!member) {
      return res.status(404).send({ message: 'El elemento no existe en la base de datos.' })
    }

    res.status(200).send({ member: member })
  })
}

function GetOrganizationChartMembers (req, res) {
  let docType = DOC_TYPE

  Info.find({ doc_type: docType }, (err, members) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
    }

    res.status(200).send({ members: members})
  })
}

function NewOrganizationChartMember (req, res) {
  let member = new Info()

  member.doc_type = DOC_TYPE
  member.meta.title = req.body.meta.title
  member.meta.content = req.body.meta.content
  member.meta.col = req.body.meta.col
  member.meta.row = req.body.meta.row
  member.meta.list = req.body.meta.list
  member.meta.images_url = req.body.meta.images_url
  member.meta.avatar_url = req.body.meta.avatar_url

  member.save((err, memberStored) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al intentar guardar los datos en la base de datos. ' + err })
    }

    res.status(200).send({ member: memberStored })
  })
}

function UpdateOrganizationChartMember (req, res) {
  let id = req.params.id
  let body = req.body

  Info.findByIdAndUpdate(id, body, (err, memberUpdated) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al intentar actualizar un elemento de la base de datos. ' + err })
    }

    res.status(200).send({ member: memberUpdated })
  })
}

function DeleteOrganizationChartMember (req, res) {
  let id = req.params.id

  Info.findById(id, (err, member) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al intentar borrar un elemento de la base de datos. ' + err })
    }

    member.remove(err => {
      if (err) {
        return res.status(500).send({ message: 'Ha ocurrido un error al intentar borrar un elemento de la base de datos. ' + err })
      }

      res.status(200).send({ message: 'El elemento ha sido borrado' })
    })
  })
}

module.exports = {
  GetOrganizationChartMember,
  GetOrganizationChartMembers,
  NewOrganizationChartMember,
  UpdateOrganizationChartMember,
  DeleteOrganizationChartMember
}
