const mongoose = require('mongoose')

const productScheme = new mongoose.Schema(
  {
    /*
      productType 
      0 beat
    */
    productType: {
      type: Number
    },
    title:{
      type: String,
    },
    description: {
      type: String
    },
    cover: {
      type: String
    },
    tags: {
      type: [{type: Number}]
    },
    licences: [{type: Object}],
    user: {
      type: mongoose.ObjectId,
      ref: 'users'
    },
    deleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps:true,
    versionKey:false
  }
);

module.exports = mongoose.model("product", productScheme)