const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const APP_HOST = process.env.APP_HOST
const PORT = process.env.PORT

const UserScheme = new mongoose.Schema(
  {
    email:{
      type:String,
      required: true,
      unique: true
    },
    password:{
      type: String,
      required: true
    },
    role:{
      type: [Number]
    },
    username:{
      type: String,
    },
    first_name:{
      type: String,
    },
    last_name:{
      type: String,
    },
    profileImage: {
      type: String
    },
  },
  {
    timestamps:true,
    versionKey:false
  }
);

UserScheme.pre('save', function(next) {
  console.log(this.isModified('password'))
  if (this.isModified('password')) {
    bcrypt.hash(this.password, saltRounds, (err, hashedPassword) => {
      if (err) return next(err)
      this.password = hashedPassword
      next()
    })
  }
  if(!this.profileImage){
    this.profileImage = `${APP_HOST}:${PORT}/api/user/profile/user_default.png`
  }
});

UserScheme.methods.comparePassword = async function(password){
  if(!password) throw new Error('Password is miss can not compare!')
  try {
    const result = await bcrypt.compare(password, this.password)
    return result
  } catch (error) {
    console.log('Error while comparing password!', error.message)
  }
}

UserScheme.methods.setProfileImage = function (filename) {
  if(filename){
    this.profileImage = `${APP_HOST}:${PORT}/storage/${filename}`
  } else {
    this.profileImage = `${APP_HOST}:${PORT}/default/user_default.png`
  }
}

module.exports = mongoose.model("users", UserScheme)