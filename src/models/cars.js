const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Car = new Schema({
  maker: String,
  model: String,
  year: Number,
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'Cars'
  }
})

module.exports = mongoose.model('Car', Car)