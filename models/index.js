const { model } = require("mongoose")

const models = {
  User: require('./nosql/users'),
}

module.exports = models