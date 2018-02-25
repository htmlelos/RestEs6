const router = require('express-promise-router')()
const {
  ping
} = require('../controllers/public')

router.get('/ping', ping)

module.exports = router