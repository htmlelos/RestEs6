const router = require('express-promise-router')()
const {
  index
} = require('../controllers/cars')

router.get('/', index)
// router.post('/', newCar)

module.exports = router