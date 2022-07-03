const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurants')

//setting create restaurant
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const { name, category, location, google_map, rating, phone, image, description } = req.body

  return Restaurant.create({ name, category, location, google_map, rating, phone, image, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//setting edit restaurant
router.get('/:restaurantId/edit', (req, res) => {
  const id = req.params.restaurantId
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})

router.put('/:restaurantId', (req, res) => {
  const id = req.params.restaurantId
  const { name, category, location, google_map, rating, phone, image, description } = req.body
  return Restaurant.findById(id)
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
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.error(error))
})

//setting remove restaurant
router.delete('/:restaurantId', (req, res) => {
  const id = req.params.restaurantId
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect(`/`))
    .catch(error => console.error(error))
})

//setting restaurants
router.get('/:restaurantId', (req, res) => {
  const restaurant = req.params.restaurantId
  return Restaurant.findById(restaurant)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.error(error))
})


module.exports = router