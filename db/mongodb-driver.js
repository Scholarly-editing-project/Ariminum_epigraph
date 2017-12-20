const mongoose = require('mongoose')
const epigraphScheme = require('./schemas/epigraph')

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
  save: function (obj, callback) {

    let Epigraph = this._getEpigraphModel()

    new Epigraph(obj).save(function (err, res) {
      if (err) return callback(err)

      return callback(null, res)
    });
  },

  /**
   * 
   */
  findAll: function (callback) {

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
  findById: function (id, callback) {

    let Epigraph = this._getEpigraphModel()

    let filter = {
      '_id': id
    }

    // Get single epigraph from id
    Epigraph.find(filter, (err, epigraph) => {

      // Throw given errors
      if (err) return callback(err)

      // Or send back JSON object
      return callback(null, epigraph)
    })
  }
}