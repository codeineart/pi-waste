'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InfoSchema = Schema({
  doc_type: { type: String, enum: ['mission_vision', 'welcome_message', 'birth_message', 'organization_chart', 'peer_committee', 'policies', 'certs', 'social', 'links'] },
  meta: {
    title: String,
    content: String,
    col: {type: Number, default: 0},
    row: {type: Number, default: 0},
    list: [],
    images_url: [],
    avatar_url: String
  }
})

module.exports = mongoose.model('Info', InfoSchema, 'Info')
