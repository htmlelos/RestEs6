const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const users = require('./routers/users')

const server = express()
// Conectar la base de datos
mongoose.connect('mongodb://localhost/test')
  .then(db => console.log('Database connected'))
  .catch(error => console.log('Can\'t connect to database'))
// Configuraciones
server.set('port', process.env.PORT || 3000)
// Middlewares
server.use(morgan('dev'))
server.use(bodyParser.json())
// routes
server.use('/', users)
// status files
// error handlers
// Incializar el servidor
server.listen(server.get('port'), () => {
  console.log('Server listening port...', server.get('port'))
})