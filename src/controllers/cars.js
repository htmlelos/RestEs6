const Car = require('../models/cars')

module.exports = {
  index: async (request, response, next) => {
    console.log('INDEX CARS')
    const cars = await Car.find({})
    response.status(200).json({success: true, cars})
  }
}