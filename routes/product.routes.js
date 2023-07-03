const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controller')
const upload = require('../middleware/upload.middleware')
const {auth} = require('../middleware/auth')


router.post('/', auth, productController.create)
router.post('/:id', auth, upload.single('coverImage'), productController.updateCover)
router.get('/getAll', auth, productController.getAllProducts)


module.exports = router