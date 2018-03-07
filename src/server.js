const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const detect = require('detect-port')
const common = require('./routers/public')
const users = require('./routers/users')
const cars = require('./routers/cars')

const server = express()
// Conectar la base de datos
if (process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb://localhost/test')
    .then(db => console.log('Database connected'))
    .catch(error => console.log('Can\'t connect to database'))
} else {
  mongoose.connect('mongodb://localhost/cars')
    .then(db => console.log('Database connected'))
    .catch(error => console.log('Can\'t connect to database'))
}
// Configuraciones
const setPort = async server => {
  const port = await detect(process.env.PORT || 3000)
  server.set('port', port)
}

setPort(server)

// Middlewares
if (process.env.NODE_ENV === 'dev') {
  server.use(morgan('dev'))
}
server.use(bodyParser.json())
// routes
server.use('/', common)
server.use('/users', users)
server.use('/cars', cars)
// status files
// error handlers
// Incializar el servidor
const listen = async server => {
  await server.listen(server.get('port'), () => {
    console.log('Server listening port...', server.get('port'))
  })
}

listen(server)

module.exports = server