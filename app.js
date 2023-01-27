require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const dbConnect = require('./config/mongo')
const path = require('path')
const { swaggerDocs: V1Docs } = require(path.join(__dirname, './config/swagger'));

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3001
app.use('/storage', express.static(`${__dirname}/storage`))
app.use('/default', express.static(`${__dirname}/public`))
app.use('/api', require('./routes') )

app.listen(port, ()=>{
  console.log('\n')
  console.log('Your API is ready.')
  V1Docs(app, port)
})

dbConnect() 