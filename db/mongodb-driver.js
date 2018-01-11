const mongoose = require('mongoose')
const epigraphScheme = require('./schemas/epigraph')
const peopleScheme = require('./schemas/people')

module.exports = {

  /**
   * 
   */
  _getEpigraphModel: function () {

    return mongoose.model('Epigraph', epigraphScheme.scheme)
  },

  /**
   * 
   */
  _getPeopleModel: function () {

    return mongoose.model('People', peopleScheme.scheme)
  },

  /**
   * 
   */
  saveEpigraph: function (obj, callback) {

    let Epigraph = this._getEpigraphModel()

    new Epigraph(obj).save(function (err, res) {
      if (err) return callback(err)

      return callback(null, res)
    });
  },

  /**
   * 
   */
  findAllEpigraphs: function (callback) {

    let Epigraph = this._getEpigraphModel()

    // Get all from collection
    Epigraph.find({}, (err, epigraphs) => {

      // Throw given errors
      if (err) return callback(err)

      // Or send back JSON object
      return callback(null, epigraphs)
    })
  },

  /**
   * 
   */
  findEpigraphsByFilter: function (filter, callback) {

    let Epigraph = this._getEpigraphModel()

    // Get single epigraph from id
    Epigraph.find(filter, (err, epigraph) => {

      // Throw given errors
      if (err) return callback(err)

      // Or send back JSON object
      return callback(null, epigraph)
    })
  },

  /**
   * 
   */
  findAllPeople: function (filter, callback) {

    let People = this._getPeopleModel()

    // Get all from collection
    People.find(filter, (err, people) => {

      // Throw given errors
      if (err) return callback(err)

      // Or send back JSON object
      return callback(null, people)
    })
  },

  /**
   * 
   */
  savePeople: function (obj, callback) {

    let People = this._getPeopleModel()

    new People(obj).save(function (err, res) {
      if (err) return callback(err)

      return callback(null, res)
    });
  },
}