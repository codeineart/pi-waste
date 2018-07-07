'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = Schema({
  creator: {
    ref: { type: String },
    name: { type: String }
  },
  title: String,
  details: String,
  created: Date,
  // guest_users_id: { type: [Schema.Types.ObjectId] },
  type: { type: String, enum: ['global', 'personal'] },
  // visibility: { type: [String] },
  event: {
    allDay: Boolean,
    start: Date,
    end: Date
  }
})

module.exports = mongoose.model('Events', EventSchema, 'Events')
