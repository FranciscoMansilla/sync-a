const express = require('express')
const router = express.Router()
const licenceController = require('../controllers/licence.controller')
const upload = require('../middleware/upload.middleware')
const {auth} = require('../middleware/auth')


router.get('/getAllLicences', auth, licenceController.getAllLicences)


module.exports = router