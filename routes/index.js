const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurant = require('./modules/restaurant')
const User = require('./modules/users')

router.use('/', home)
router.use('/restaurants', restaurant)
router.use('/users', User)

module.exports = router