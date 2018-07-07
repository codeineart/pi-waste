const bcrypt = require('bcrypt-nodejs')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const sysConfigSchema = new Schema({
  type: ['modules', 'departments', 'roles'],
  metadata: {}
})

module.exports = mongoose.model('SysConfig', sysConfigSchema)
