// MAIN FUNCTIONALITY IMPORTS
let express = require('express')
let router = express.Router()

// CONTROLLER IMPORT
let auth_api = require('../controllers/auth.js')

router.post('/login', auth_api.postLogin)
router.get('/token', auth_api.checkToken)

router.post('/createuser', auth_api.createUser)
router.get('/getuser/:id', auth_api.getUser)
router.get('/getusers', auth_api.getUsers)
router.post('/updateuser', auth_api.updateUser)
router.post('/deleteuser', auth_api.deleteUser)
// router.post('/signup', auth_api.postSignup) // not needed in this project
// router.post('/logout', auth_api.logout) // logout is handled by the client

module.exports = router
