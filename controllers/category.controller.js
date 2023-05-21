const {Category} = require('../models')

const categoryController = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.where({})
      res.status(200).send({success: true, categories})
    } catch (error) {
      console.error(error)
      res.status(500).send(error)
    }
  }
}

module.exports = categoryController