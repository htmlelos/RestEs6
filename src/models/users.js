const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  cars: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
})

module.exports = mongoose.model('User', User)