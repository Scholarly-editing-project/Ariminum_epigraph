const mongoose = require('mongoose')

let scheme = mongoose.Schema({
  _id: String,
  title: String,
  category: String,
  "doer/s": [String],
  "receiver/s": [String],
  description: [String],
  documents: [String]
})

module.exports = {
  scheme
}