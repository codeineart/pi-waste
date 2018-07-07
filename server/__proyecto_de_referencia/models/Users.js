const bcrypt = require('bcrypt-nodejs')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const userSchema = new Schema(
  {
    photo_url: { type: String },
    rut: { type: String, unique: true, required: true },
    name: { type: String },
    email: { type: String, unique: true, lowercase: true, required: true },
    password: { type: String, required: true },
    born: { type: Date },
    phone: {
      mobile: { type: String },
      annex: { type: String }
    },
    position: { type: String },
    department: { type: String },
    project: { type: String },
    role: {
      type: String,
      default: 'trabajador',
      enum: ['master', 'ejecutivo', 'trabajador']
    },
    permits: { type: [String] },
    new_user: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', function (next) {
  const user = this
  if (!user.isModified('password')) {
    return next()
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      next(err)
    }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        next(err)
      }
      user.password = hash
      next()
    })
  })
})

userSchema.methods.compararPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, sonIguales) => {
    if (err) {
      return cb(err)
    }
    cb(null, sonIguales)
  })
}

module.exports = mongoose.model('User', userSchema)
