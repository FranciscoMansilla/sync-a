const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category.controller')
const upload = require('../middleware/upload.middleware')
const {auth} = require('../middleware/auth')


router.get('/getAllCategories', auth, categoryController.getAllCategories)


module.exports = router