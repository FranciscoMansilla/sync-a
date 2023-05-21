const mongoose = require('mongoose')

const CategoryScheme = new mongoose.Schema(
  {
    code:{
      type: Number,
      unique: true
    },
    name:{
      type: String,
    }
  },
  {
    timestamps:true,
    versionKey:false
  }
);

module.exports = mongoose.model("category", CategoryScheme)