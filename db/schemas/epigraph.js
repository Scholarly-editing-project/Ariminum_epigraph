const mongoose = require('mongoose')

let scheme = mongoose.Schema({
  _id: String,
  cil: String,
  cil_URL: String,
  title: [String],
  transcription: [String],
  translation: [String],
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
  people: [String],
  actions: [String],
  date: String,
  bibliographies: [{
    citation: String,
    uri: String
  }]
})

module.exports = {
  scheme
}