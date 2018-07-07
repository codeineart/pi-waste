'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = Schema({
  contract: String,
  name: String,
  description: String,
  date: Date,
  cover_img_url: String,
  gal_img_url: { type: [String] }
})

module.exports = mongoose.model('Projects', ProjectSchema, 'Projects')
