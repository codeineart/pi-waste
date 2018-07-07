'use strict'

const SysConfig = require('../models/SysConfig')

function sysConfigSet (req, res, next) {
  SysConfig.findOne({ type: req.body.type }, (err, configFound) => {
    if (err) return res.status(409).json({ msg: err })

    if (configFound) {
      configFound.metadata = req.body.metadata
      configFound.save(err => {
        if (err) {
          return res.status(409).json({ msg: err })
        }
        return res.status(200).json({
          msg: 'Configuración ' + req.body.type + ' actualizada.'
        })
      })
    } else {
      const newConfig = new SysConfig({
        type: req.body.type,
        metadata: req.body.metadata
      })

      console.log(newConfig)

      newConfig.save(err => {
        if (err) {
          return res.status(409).json({ msg: err })
        }
        return res.status(200).json({ msg: 'Configuración ingresada al sistema.' })
      })
    }
  })
}

function getPermits (req, res) {
  SysConfig.findOne({ type: 'departments' }, (err, permits) => {
    if (err) return res.status(409).json({ msg: err })

    return res.status(200).json({ permisos: permits.metadata.availables })
  })
}

module.exports = {
  sysConfigSet,
  getPermits
}
