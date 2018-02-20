// const router = require('express').Router()
const router = require('express-promise-router')()
const { index,
  newUser,
  getUser,
  replaceUser,
  deleteUser,
  getUserCars,
  addUserCar
} = require('../controllers/users')

// const router = express.Router()

router.get('/users', index)
router.post('/users', newUser)
router.get('/users/:userId', getUser)
router.put('/users/:userId', replaceUser)
router.delete('/users/:userId', deleteUser)
router.get('/users/:userId/cars', getUserCars)
router.post('/users/:userId/cars', addUserCar)

module.exports = router