'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NewSchema = Schema({
  creator: {
    _id: { type: Schema.Types.ObjectId },
    name: String,
    date: Date
  },
  title: String,
  content: String,
  available: String,
  tags: { type: [String] },
  cover_url: String,
  images_url: { type: [String] }
})

module.exports = mongoose.model('News', NewSchema, 'News')
