/**
 * Express server used to manage requests 
 */

// Import all needed libraries
const express = require('express')
const mongoose = require('mongoose')
const app = express()

// Store some useful and global constants
const DIRNAME = __dirname

// Import the JSON structure stored inside the file "constants.js"
const CONSTANTS = require('./constants')
const EPIGRAPH = require('./db/schemas/epigraph')

// Connext to mongodb 
mongoose.connect(CONSTANTS.DB.CONNECTION)

/**
 * This function manage the root request
 * 
 * eg. localhost:8080 from a browser will trigger this event 
 * and it will run its content
 * 
 * This will return the index page
 */
app.get('/', function (req, res) {
  res.sendFile(`${DIRNAME}/${CONSTANTS.PAGES.INDEX_PAGE}`)
})

/**
 * Get the entire list of epigraphs
 */
app.get('/api/epigraph', (req, res) => {

  // Create the model from Scheme
  mongoose.model(CONSTANTS.DB.EPIGRAPH, EPIGRAPH.scheme)

    // Get all from collection
    .find({}, (err, epigraphs) => {

      // Throw given errors
      if (err) throw err

      // Or send back JSON object
      res.send(epigraphs)
    })
})

/**
 * This function allows front-end html files to load any asset file 
 * stored inside the folder named "assets"
 */
app.use(express.static(CONSTANTS.FOLDERS.ASSETS))

/**
 * If none of the precedent methods are called 
 */
app.use(function (req, res, next) {

  // Update HTTP code to "404 Not Found"
  res.status(404)

  // Return 404 error
  res.sendFile(`${DIRNAME}/${CONSTANTS.FOLDERS.TEMPLATES}/${CONSTANTS.PAGES.NOT_FOUND}`)
})

/**
 * This method open the port designed PORT
 * 
 * Now the server is still listening on this port for requests
 */
app.listen(CONSTANTS.PORT, function () {
  console.log(`${CONSTANTS.NAME} listening on port ${CONSTANTS.PORT}!`)
})