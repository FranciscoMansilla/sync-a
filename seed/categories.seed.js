require('colors')
const { Category } = require('../models')

const categories = [
  { name: 'Reggaeton', code: 1 },
  { name: 'Hip Hop', code: 2 },
  { name: 'Trap', code: 3 },
  { name: 'Dembow', code: 4 },
  { name: 'R&B', code: 5 },
  { name: 'Dancehall', code: 6 },
];

const seedCategories = {
  importData: async() => {
    let count = 0
    for(let i = 0; i < categories.length; i++){
      const find = await Category.findOne({code: categories[i].code})
      if(!find){
        await Category.create(categories[i])
        count++
      }
    }
    console.log(`New categories entries: ${count}`.green)
  },
  deleteData: async() => {
    let count = 0
    for(let i = 0; i < categories.length; i++){
      const find = await Category.findOneAndDelete({code: categories[i].code})
      if(find){
        count++
      } 
    }
    console.log(`Categories deleted: ${count}`.red)
  }
}

module.exports = seedCategories