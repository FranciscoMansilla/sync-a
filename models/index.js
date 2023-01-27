const { model } = require("mongoose")

const models = {
  User: require('./nosql/users'),
  Area: require('./nosql/area'),
  Departament: require('./nosql/departament'),
  Position: require('./nosql/position'),
  Prospect: require('./nosql/prospect'),
  Planning: require('./nosql/planning'),
  Proposal: require('./nosql/proposal'),
}

module.exports = models