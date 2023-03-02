require('colors')
const {User} = require('../models')

const users = [
  {
    username: 'root',
    email: 'root@synca.com',
    password: 'SYNCA2023',
    role: [0]
  },
  {
    username: 'Fran',
    email: 'fran@synca.com',
    password: 'SYNCA2023',
    role: [1]
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