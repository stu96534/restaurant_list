const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurants')
const restaurantList = require('../../models/seeds/restaurant.json')

router.get('/', (req, res) => {
  Restaurant.find({})
    .lean()
    .then(restaurantList => res.render('index', { restaurantList }))
    .catch(error => console.error(error))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(list => {
    return list.name.toLowerCase().includes(keyword.toLowerCase()) || list.category.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurantList: restaurants, keyword: keyword })
})

module.exports = router