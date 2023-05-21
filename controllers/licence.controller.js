const {Licence} = require('../models')

const licenceController = {
  getAllLicences: async (req, res) => {
    try {
      const licences = await Licence.where({})
      res.status(200).send({success: true, licences})
    } catch (error) {
      console.error(error)
      res.status(500).send(error)
    }
  }
}

module.exports = licenceController