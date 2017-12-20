const mongoose = require('mongoose')

let scheme = mongoose.Schema({
  _id: String,
  title: [String],
  transcription: [String],
  repository: String,
  support: String,
  material: String,
  size: {
    structure: [String],
    letters: String
  },
  place: {
    ancient: String,
    modern: String,
    geo: {
      accuracy: String,
      lat: String,
      len: String
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