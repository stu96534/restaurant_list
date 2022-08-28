const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurants')

// setting create restaurant
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const { name, category, location, google_map, rating, phone, image, description } = req.body
  const userId = req.user._id

  return Restaurant.create({ name, category, location, google_map, rating, phone, image, description, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// setting edit restaurant
router.get('/:restaurantId/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurantId
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})

router.put('/:restaurantId', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurantId
  const { name, category, location, google_map, rating, phone, image, description } = req.body
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant.name = name
      restaurant.category = category
      restaurant.location = location
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.phone = phone
      restaurant.image = image
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.error(error))
})

// setting remove restaurant
router.delete('/:restaurantId', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurantId
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// setting restaurants
router.get('/:restaurantId', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurantId
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.error(error))
})

module.exports = router
