const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Restaurant = require('../restaurants')
const restaurantList = require('./restaurant.json')
const User = require('../user')
const password = '12345678'

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(password, salt))
    .then(hash => User.create({
      name: 'user1',
      email: 'user1@example.com',
      password: hash
    },
      {
        name: 'user2',
        email: 'user2@example.com',
        password: hash
      }
    ))
    .then(user => {
      const userId1 = user[0]._id
      const userId2 = user[1]._id
      const lists = restaurantList.results
      return Promise.all(Array.from([0, 1, 2], i => Restaurant.create({ name: lists[i].name, category: lists[i].category, image: lists[i].image, location: lists[i].location, phone: lists[i].phone, google_map: lists[i].google_map, rating: lists[i].rating, description: lists[i].description, userId: userId1 },
        { name: lists[(i + 3)].name, category: lists[(i + 3)].category, image: lists[(i + 3)].image, location: lists[(i + 3)].location, phone: lists[(i + 3)].phone, google_map: lists[(i + 3)].google_map, rating: lists[(i + 3)].rating, description: lists[(i + 3)].description, userId: userId2 }
      ))
      )

    })
    .then(() => {
      console.log('done.')
      process.exit()
    })

})