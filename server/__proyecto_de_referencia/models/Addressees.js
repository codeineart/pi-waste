'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AddresseeSchema = Schema({
  type: { type: String, enum: ['solicitud', 'soporte'] },
  name: String,
  email: String
})

module.exports = mongoose.model('Addressees', AddresseeSchema, 'Addressees')
