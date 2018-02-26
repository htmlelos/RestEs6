const User = require('../models/users')
const Car = require('../models/cars')

module.exports = {
  index: async (request, response, next) => {
    const users = await User.find({})
    // throw new Error('ERROR FICTICIO')
    response.status(200).json({ success: true, users })
  },
  newUser: async (request, response, next) => {
    const newUser = new User(request.body)
    const user = await newUser.save()
    response.status(201).json({ success: true, user })
  },
  getUser: async (request, response, next) => {
    const { userId } = request.params
    const user = await User.findById(userId)
    response.status(200).json({ success: true, user })
  },
  replaceUser: async (request, response, next) => {
    const { userId } = request.params
    const newUser = request.body
    const oldUser = await User.findByIdAndUpdate(userId, newUser)
    response.status(200).json({ success: true })
  },
  updateUser: async (request, response, next) => {
    const { userId } = request.params
    const newUser = request.body
    const oldUser = await User.findByIdAndUpdate(userId, newUser)
    response.status(200).json({ success: true })
  },
  deleteUser: async (request, response, next) => {
    const { userId } = request.params
    await User.findByIdAndRemove(userId)
    response.status(200).json({ success: true })
  },
  getUserCars: async (request, response, next) => {
    const { userId } = request.params
    const user = await User.findById(userId).populate('cars')
    response.status(200).json({ success: true, cars: user.cars })
  },
  addUserCar: async (request, response, next) => {
    const { userId } = request.params
    const car = new Car(request.body)
    const user = await User.findById(userId)
    console.log('USER', user);
    if (user) {
      car.seller = user
      await car.save()
      user.cars.push(car)
      await user.save()
      response.status(201).json({ success: true, car })
    } else {
      response.status(404).json({ success: false, message: 'user not found' })
    }
  }
}