require('colors')
const {User} = require('../models')
const { v4: uuidv4 } = require('uuid')
const {getToken, getTokenData} = require('../config/jwt.config')

const userController = {
  test: async(req, res)=>{
    const {filename} = req.file
    console.log(filename)
    res.send(true)
  },
  login: async(req,res)=>{
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(user){
      const result = await user.comparePassword(password)
      if(result){
        let token = null
        if(user.role[0] === 0){
          token = getToken({email: user.email, role: user.role})
        } else {
          token = getToken({email: user.email, role: user.role, company_id: user.company_id})
        }
        return res.send({
          success: true,
          msg: 'logueado',
          token
        })
      }
      return res.status(400).send({
        success: false,
        msg: 'Contraseña incorrecta!',
      })
    } else {
      res.status(404).send({
        success: false,
        msg: 'Usuario no registrado!'
      })
    }
  },
  register: async(req,res)=>{
    try {
      const { data } = req.body
      const filename = req.file? req.file.filename : false
      let user = await User.findOne({email: data.email}) || null;

      if(user){
        return res.status(400).send({
          success: false,
          msg: 'El usuario ya existe'
        })
      }

      const newUser = await User(data)

      if(!newUser){
        res.status(404).send({
          success: false,
          msg: 'Error al registrar usuario',
        })
      } else {
        const token = getToken({email: data.email, role: data.role})
        await newUser.setProfileImage(filename)
        const userStored = await newUser.save()
        res.status(200).send({
          success: true,
          msg: 'Usuario Registrado!',
          token,
          newUser: userStored
        })
      }
    } catch (error) {
      console.log(error)
      res.status(409).send({
        success: false,
        msg: 'Error al registrar',
        error: error
      })
    }
  },
  info: async(req, res)=>{
    const authorization = req.get('authorization')
    let token = null
    if(authorization && authorization.toLowerCase().startsWith('bearer')){
      token= authorization.substring(7)
    }
    const decodedToken = getTokenData(token)
    if (decodedToken) {
    const user = await User.findOne({email: decodedToken.data.email})
    if(user){
      res.status(200).send({success: true, user})
    } else {
      res.status(404).send({succes: false, auth: 'no auth, no user'})
    }
  } else {
    res.status(400).send({succes: false, auth: 'no auth'})
  }
  },
  profile: (req, res) => {
    const { url } = req.params;
    try {
      if(url === 'user_default.png'){
        res.download(path.join(__dirname, "..", "public", `user_default.png`));
      } else if(url){
        res.download(path.join(__dirname, "..", "storage", "images",`${url}`));
      } else {
        res.status(404).send({ success: false });
      }
    } catch (error) {
      res.status(500).send({ success: false });
    }
  }
}
module.exports = userController