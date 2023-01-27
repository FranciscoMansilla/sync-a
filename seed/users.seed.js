require('colors')
const {User} = require('../models')

const users = [
  {
    name: 'root',
    email: 'root@quercu.com',
    password: 'EICHE2023',
    role: [0]
  }
]

const seedUsers = {
  importData: async() => {
    let count = 0
    for(let i = 0; i < users.length; i++){
      const findUser = await User.findOne({email: users[i].email})
      if(!findUser){
        await User.create(users[i])
        count++
      }
    }
    console.log(`New user entries: ${count}`.green)
  },
  deleteData: async() => {
    let count = 0
    for(let i = 0; i < users.length; i++){
      const findUser = await User.findOneAndDelete({email: users[i].email})
      if(findUser){
        count++
      } 
    }
    console.log(`Users deleted: ${count}`.red)
  }
}

module.exports = seedUsers