'use strict'

const Department = require('../models/Departments.js')

function GetDepartment (req, res) {
  let id = req.params.id

  Department.findById(id, (err, department) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
    }
    if (!department) {
      return res.status(404).send({ message: 'El elemento no existe en la base de datos.' })
    }

    res.status(200).send({ department: department })
  })
}

function GetDepartments (req, res) {
  Department.find({}, (err, departments) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
    }

    res.status(200).send({ departments: departments })
  })
}

function NewDepartment (req, res) {
  let departamento = new Department()

  departamento.departmentName = req.body.departmentName

  departamento.save((err, departmentStored) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al intentar guardar los datos en la base de datos. ' + err })
    }

    res.status(200).send({ department: departmentStored })
  })
}

function UpdateDepartment (req, res) {
  let id = req.params.id
  let body = req.body

  Department.findByIdAndUpdate(id, body, (err, departmentUpdated) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al intentar actualizar un elemento de la base de datos. ' + err })
    }

    res.status(200).send({ department: departmentUpdated })
  })
}

function DeleteDepartment (req, res) {
  let id = req.params.id

  Department.findById(id, (err, department) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al intentar borrar un elemento de la base de datos. ' + err })
    }

    department.remove(err => {
      if (err) {
        return res.status(500).send({ message: 'Ha ocurrido un error al intentar borrar un elemento de la base de datos. ' + err })
      }

      res.status(200).send({ message: 'El elemento ha sido borrado' })
    })
  })
}

module.exports = {
  GetDepartment,
  GetDepartments,
  NewDepartment,
  UpdateDepartment,
  DeleteDepartment
}