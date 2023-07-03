const { productMessage } = require("../messages/product.message");
const { Product } = require("../models");

const productController = {
  create: async (req, res) => {
    console.log("pasaando");
    const data = req.body;
    console.log(req.body)
    try {
      const product = await Product.create(data);
      res.status(200).send({
        success: true,
        message: productMessage.PRODUCT_CREATED,
        data: product,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  updateCover: async (req, res) => {
    const { id } = req.params;
    const filename = req.file?.filename ?? false;
    try {
      const productUpdated = await Product.findOneAndUpdate(
        { _id: id },
        { cover: filename }
      );
      res.status(200).send({
        success: true,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.where({});
      res.status(200).send({
        success: true,
        data: products,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};

module.exports = productController;
