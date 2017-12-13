const mongoose = require('mongoose')

let scheme = mongoose.Schema({
  title: [String],
  repository: String,
  support: String,
  material: String,
  size: {
    structure: String,
    base: String,
    letters: {
      body: String,
      last_line: String
    }
  },
  place: {
    ancient: String,
    modern: String,
    geo: {
      lat: Number,
      len: Number
    }
  },
  date: String,
  bibliographies: [{
    citation: String,
    uri: String
  }]
})

module.exports = {
  scheme
}