'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FileSchema = Schema({
  name: String,
  type: String,
  creator: {
    id: { type: Schema.Types.ObjectId },
    section: String,
    name: String,
    date: Date
  },
  available: [String],
  url: String,
  size_Mb: Number,
  last_modification: Date,
  created: Date
})

FileSchema.index({ name: 'text' })

/**
 * TO-DO:
 * - ImplementGRIDFS methods for file handling
 */
// FileSchema.methods

module.exports = mongoose.model('Files', FileSchema, 'Files')
