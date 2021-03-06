const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')


const Restaurant = require('./models/restaurants')

const routes = require('./routes')
require('./config/mongoose')

const app = express()
const port = 3000




app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)






//setting search


app.listen(port, () => {
  console.log(`This ih listening on ${port}`)
})