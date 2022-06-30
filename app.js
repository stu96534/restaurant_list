const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurants')
const restaurantList = require('./models/seeds/restaurant.json')

const app = express()
const port = 3000
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurantList => res.render('index', { restaurantList }))
    .catch(error => console.error(error))
})

//setting create restaurant
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  const { name, category, location, google_map, rating, phone, image, description } = req.body

  return Restaurant.create({ name, category, location, google_map, rating, phone, image, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//setting edit restaurant
app.get('/restaurants/:restaurantId/edit', (req, res) => {
  const id = req.params.restaurantId
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})

app.post('/restaurants/:restaurantId/edit', (req, res) => {
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
app.post('/restaurants/:restaurantId/delete', (req, res) => {
  const id = req.params.restaurantId
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect(`/`))
    .catch(error => console.error(error))
})

//setting restaurants
app.get('/restaurants/:restaurantId', (req, res) => {
  const restaurant = req.params.restaurantId
  return Restaurant.findById(restaurant)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.error(error))
})

//setting search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(list => {
    return list.name.toLowerCase().includes(keyword.toLowerCase()) || list.category.toLowerCase().includes(keyword.toLowerCase())
  })
  console.log(restaurants)
  res.render('index', { restaurantList: restaurants, keyword: keyword })
})

app.listen(port, () => {
  console.log(`This ih listening on ${port}`)
})