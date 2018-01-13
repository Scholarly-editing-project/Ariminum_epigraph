const mongoose = require('mongoose')
const actionScheme = require('./schemas/action')
const epigraphScheme = require('./schemas/epigraph')
const groupScheme = require('./schemas/group')
const peopleScheme = require('./schemas/people')

module.exports = {

  /**
   * 
   */
  _getActionModel: function () {

    return mongoose.model('Action', actionScheme.scheme)
  },

  /**
   * 
   */
  _getEpigraphModel: function () {

    return mongoose.model('Epigraph', epigraphScheme.scheme)
  },

  /**
   * 
   */
  _getGroupModel: function () {

    return mongoose.model('Group', groupScheme.scheme)
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
  findActions: function (filter, callback) {

    let Action = this._getActionModel()

    // GGet actions by filter
    Action.find(filter, (err, actions) => {

      // Throw given errors
      if (err) return callback({
        STATUS: 500,
        error: err
      })

      if(actions.length == 0)
        return callback({
          STATUS: 404,
          body: 'Actions not found'
        })

      // Or send back JSON object
      return callback(null, actions)
    })
  },

  /**
   * 
   */
  findEpigraphs: function (filter, callback) {

    let Epigraph = this._getEpigraphModel()

    // Get epigraphs by filter
    Epigraph.find(filter, (err, epigraphs) => {

      // Throw given errors
      if (err) return callback({
        STATUS: 500,
        error: err
      })

      if (epigraphs.length == 0)
        return callback({
          STATUS: 404,
          body: 'Epigraphs not found'
        })

      // Or send back JSON object
      return callback(null, epigraphs)
    })
  },

  /**
   * 
   */
  findGroups: function (filter, callback) {

    let Group = this._getGroupModel()

    // Get groups by filter
    Group.find(filter, (err, groups) => {

      // Throw given errors
      if (err) return callback({
        STATUS: 500,
        error: err
      })

      if (groups.length == 0)
        return callback({
          STATUS: 404,
          body: 'Groups not found'
        })

      // Or send back JSON object
      return callback(null, groups)
    })
  },

  /**
   * 
   */
  findPeople: function (filter, callback) {

    let People = this._getPeopleModel()

    // Get people by filter
    People.find(filter, (err, people) => {

      // Throw given errors
      if (err) return callback({
        STATUS: 500,
        error: err
      })

      if(people.length == 0)
        return callback({
          STATUS: 404,
          body: 'People not found'
        })

      // Or send back JSON object
      return callback(null, people)
    })
  }
}