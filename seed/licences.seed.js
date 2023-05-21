require('colors')
const { Licence } = require('../models')

const licences = [
  { name: 'licence 0', description: 'description', code: 0 },
  { name: 'licence 1', description: 'description', code: 1 },
  { name: 'licence 2', description: 'description', code: 2 },
  { name: 'licence 3', description: 'description', code: 3 },
];

const seedLicences = {
  importData: async() => {
    let count = 0
    for(let i = 0; i < licences.length; i++){
      const find = await Licence.findOne({code: licences[i].code})
      if(!find){
        await Licence.create(licences[i])
        count++
      }
    }
    console.log(`New licences entries: ${count}`.green)
  },
  deleteData: async() => {
    let count = 0
    for(let i = 0; i < licences.length; i++){
      const find = await Licence.findOneAndDelete({code: licences[i].code})
      if(find){
        count++
      } 
    }
    console.log(`Licences deleted: ${count}`.red)
  }
}

module.exports = seedLicences