'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DepartmentSchema = Schema({
  departmentName: String
})

module.exports = mongoose.model('Departments', DepartmentSchema, 'Departments')
