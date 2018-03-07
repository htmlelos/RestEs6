// const router = require('express').Router()
const router = require('express-promise-router')()
const { 
  verifyUser,
  index,
  newUser,
  getUser,
  replaceUser,
  deleteUser,
  getUserCars,
  addUserCar
} = require('../controllers/users')

// const router = express.Router()

router.get('/', index)
router.post('/', verifyUser, newUser)
router.get('/:userId', getUser)
router.put('/:userId', verifyUser, replaceUser)
router.delete('/:userId', deleteUser)
router.get('/:userId/cars', getUserCars)
router.post('/:userId/cars', addUserCar)

module.exports = router