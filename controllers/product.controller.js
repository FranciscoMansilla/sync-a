const {Product} = require('../models')

const categoryController = {
  create: async (req, res)=>{
    const data = req.body.data
    const user_id = req.__user_id
    try {
      const product = await Product.create(req.body)
      res.status(200).send({success: true, product})
    } catch (error) {
      console.error(error)
      res.status(500).send(error)
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.where({})
      res.status(200).send({success: true, products})
    } catch (error) {
      console.error(error)
      res.status(500).send(error)
    }
  }
}

module.exports = categoryController