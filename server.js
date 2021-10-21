const express = require('express')
const cors = require('cors')
require('dotenv').config()
const passport = require('passport')
const app = express()
const router = require('./routes/index')
require('./config/database')
require('./config/passport')


app.use(cors())
app.use(express.json())

app.use('/api', router) 

app.listen(4000, ()=> console.log('hi !!!server listening on port 4000'))




















