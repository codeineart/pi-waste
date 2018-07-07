'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PositionSchema = Schema({
  position: String
})

module.exports = mongoose.model('Positions', PositionSchema, 'Positions')
