'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VideoSchema = Schema({
  name: String,
  description: String,
  type: String,
  thumbnail: String,
  creator: {
    id: { type: Schema.Types.ObjectId },
    name: String,
    date: Date
  },
  tags: [],
  url: String
})

module.exports = mongoose.model('Videos', VideoSchema, 'Videos')
