const mongoose = require('mongoose')

let scheme = mongoose.Schema({
  _id: String,
  name: {
    praenomen: String,
    nomen: String,
    cognomen: String
  },
  gender: String,
  age: String,
  social_status: String,
  city: String,
  career: [{
    role: String,
    grade: String,
		place: String,
    type: String,
		description: String
  }],
  relation: [{
    is: String,
    person: String
  }],
  actions: [{
    role: String,
    name: String
  }],
  documents: [String]
})

module.exports = {
  scheme
}