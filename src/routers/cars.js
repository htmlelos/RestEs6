const router = require('express-promise-router')()
const {
  verifyCar,
  index,
  newCar,
  getCar,
  replaceCar,
  updateCar,
  deleteCar
} = require('../controllers/cars')

router.get('/', index)
router.post('/', verifyCar, newCar)
router.get('/:carId', getCar)
router.put('/:carId', verifyCar, replaceCar)
router.patch('/:carId', updateCar)
router.delete('/:cardId', deleteCar)

module.exports = router