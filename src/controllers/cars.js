const Car = require('../models/cars')

module.exports = {
  verifyCar: async (request, response, next) => {
    const { maker, model } = request.body
    if ((maker === undefined || maker === null) ||
      (model === undefined || model === null)) {
      response.status(401).json({ success: false })
    }
    next()
  },
  index: async (request, response, next) => {
    const cars = await Car.find({})
    response.status(200).json({ success: true, cars })
  },
  newCar: async (request, response, next) => {
    const newCar = new Car(request.body)
    const car = await newCar.save()
    response.status(201).json({ success: true, car })
  },
  getCar: async (request, response, next) => {
    const { carId } = request.params
    const car = await Car.findById(carId)
    response.status(200).json({ success: true, car })
  },
  replaceCar: async (request, response, next) => {
    const { carId } = request.params
    const newCar = request.body
    const oldCar = await Car.findByIdAndUpdate(carId, newCar)
    response.status(200).json({ success: true, car: newCar })
  },
  updateCar: async (request, response, next) => {
    const { carId } = request.params
    const newCar = request.body
    const oldCar = await Car.findByIdAndUpdate(carId, newCar)
    response.status(200).json({ success: true, car: newCar })
  },
  deleteCar: async (request, response, next) => {
    const { carId } = request.params
    const oldCar = await Car.findByIdAndRemove(carId)
    response.status(200).json({ success: true })
  }
}