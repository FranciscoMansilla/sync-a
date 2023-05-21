const mongoose = require('mongoose')

const LicenceScheme = new mongoose.Schema(
  {
    code:{
      type: Number,
      unique: true
    },
    name:{
      type: String,
    },
    description: {
      type: String
    }
  },
  {
    timestamps:true,
    versionKey:false
  }
);

module.exports = mongoose.model("licence", LicenceScheme)