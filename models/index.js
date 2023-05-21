const { model } = require("mongoose")

const models = {
  User: require('./nosql/users'),
  Category: require('./nosql/category'),
  Licence: require('./nosql/licence'),
  Product: require('./nosql/product'),

}

module.exports = models