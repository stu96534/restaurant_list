const mongoose = require('mongoose')
const Schema = mongoose.Schema
const RestSchema = new Schema({
  name: {
    type: String,
  required: true
},
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  localtion: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  google_map: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
})
module.exports = mongoose.model('Restaurant', RestSchema)