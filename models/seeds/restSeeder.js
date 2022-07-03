const db = require('../../config/mongoose')
const Restaurant = require('../restaurants')
const restaurantList = require('./restaurant.json')


db.once('open', () => {
  const lists = restaurantList.results
  for (const list of lists) {
    Restaurant.create({ name: list.name, category: list.category, image: list.image, location: list.location, phone: list.phone, google_map: list.google_map, rating: list.rating, description: list.description })
  }
})