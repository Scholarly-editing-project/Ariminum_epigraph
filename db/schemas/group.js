const mongoose = require('mongoose')

let scheme = mongoose.Schema({
  _id: String,
  title: String,
  members: [String],
  place: String,
  category: String,
  actions: [{
    name: String,
    role: String
  }],
  documents: [String]
})

module.exports = {
  scheme
}