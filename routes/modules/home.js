const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurants')

router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .then(restaurantList => res.render('index', { restaurantList }))
    .catch(error => console.error(error))
})

router.get('/search', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword
  const sort = req.query.sort
  let name = false
  let name2 = false
  let local = false
  let cate = false

  Restaurant.find({ userId })
    .lean()
    .sort(sort)
    .then(restaurantList => {
      const restaurants = restaurantList.filter(list => {
        return list.name.toLowerCase().includes(keyword.toLowerCase()) || list.category.toLowerCase().includes(keyword.toLowerCase())
      })
      if (sort === 'name') {
        name = true
      } else if (sort === '-name') {
        name2 = true
      } else if (sort === 'location') {
        local = true
      } else if (sort === 'category') {
        cate = true
      }

      res.render('index', { restaurantList: restaurants, keyword, name, name2, local, cate })
    })
    .catch(error => console.error(error))
})

module.exports = router
