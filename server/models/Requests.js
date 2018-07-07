'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RequestSchema = Schema({
  type: { type: String },
  emitter: {
    id: { type: Schema.Types.ObjectId },
    name: String,
    date: Date
  },
  message: String,
  subject: String,
  status: { type: String, enum: ['sent', 'pending', 'approved', 'rejected'] },
  response: String,
  updated: Date
})

module.exports = mongoose.model('Requests', RequestSchema, 'Requests')
