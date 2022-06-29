const mongoose = require('mongoose')
const Restaurant = require('../restaurants')
const restaurantList = require('./restaurant.json')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  const lists = restaurantList.results
  for (const list of lists) {
    Restaurant.create({ name: list.name, category: list.category, image: list.image, location: list.location, phone: list.phone, google_map: list.google_map, rating: list.rating, description: list.description })
  }
})