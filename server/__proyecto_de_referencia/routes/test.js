// MAIN FUNCTIONALITY IMPORTS
let express = require('express')
let router = express.Router()
let hasRole = require('../middlewares/auth').hasRole
// const cors = require('cors')

// CONTROLLER IMPORT
let api = require('../controllers/test.js')

router.get('/getmodules', api.getModules)
router.post('/createuser', api.createUser)
router.get('/checkrole', hasRole('executive'), (req, res, next) => {
  res.status(200).json({ msg: 'Role Granted' })
})

module.exports = router
