const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const restaurantList = require('./restaurant.json')

const app = express()
const port = 3000
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
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

app.get('/', (req, res) => {
  res.render('index', { restaurantList: restaurantList.results })
})

//setting restaurants
app.get('/restaurants/:restaurantId', (req, res) => {
  const restaurant = restaurantList.results.find(element => element.id.toString() === req.params.restaurantId);
  res.render('show', { restaurant: restaurant })
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