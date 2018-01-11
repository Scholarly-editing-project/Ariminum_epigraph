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
const CONSTANTS = require('./assets/constants')
const EPIGRAPH = require('./db/schemas/epigraph')
const MONGODB = require('./db/mongodb-driver')

const MONGODB_URI = typeof process.env.MONGODB_URI == 'undefined' ? CONSTANTS.DB.CONNECTION : process.env.MONGODB_URI

// Connext to mongodb 
mongoose.connect(MONGODB_URI)

/**
 * This function allows front-end html files to load any asset file 
 * stored inside the folder named "assets"
 */
app.use(express.static(CONSTANTS.FOLDERS.TEMPLATES))

/**
 * This function manage the root request
 * 
 * eg. localhost:8080 from a browser will trigger this event 
 * and it will run its content
 * 
 * This will return the index page
 */
app.get('/', (req, res) => {
  res.sendFile(`${DIRNAME}/${CONSTANTS.FOLDERS.TEMPLATES}/${CONSTANTS.PAGES.INDEX_PAGE}`)
})

app.get('/project', (req, res) => {
  res.sendFile(`${DIRNAME}/${CONSTANTS.FOLDERS.TEMPLATES}/${CONSTANTS.PAGES.PROJECT}`)
})

app.get('/inscriptions', (req, res) => {
  res.sendFile(`${DIRNAME}/${CONSTANTS.FOLDERS.TEMPLATES}/${CONSTANTS.PAGES.INSCRIPTIONS}`)
})

app.get('/contact', (req, res) => {
  res.sendFile(`${DIRNAME}/${CONSTANTS.FOLDERS.TEMPLATES}/${CONSTANTS.PAGES.CONTACT}`)
})

app.get('/groups', (req, res) => {
  res.sendFile(`${DIRNAME}/${CONSTANTS.FOLDERS.TEMPLATES}/${CONSTANTS.FOLDERS.SUB_FOLDER}/${CONSTANTS.PAGES.GROUPS}`)
})

app.get('/events', (req, res) => {
  res.sendFile(`${DIRNAME}/${CONSTANTS.FOLDERS.TEMPLATES}/${CONSTANTS.FOLDERS.SUB_FOLDER}/${CONSTANTS.PAGES.EVENTS}`)
})

app.get('/people', (req, res) => {
  res.sendFile(`${DIRNAME}/${CONSTANTS.FOLDERS.TEMPLATES}/${CONSTANTS.FOLDERS.SUB_FOLDER}/${CONSTANTS.PAGES.PEOPLE}`)
})

app.get('/city/ariminum', (req, res) => {
  res.sendFile(`${DIRNAME}/${CONSTANTS.FOLDERS.TEMPLATES}/${CONSTANTS.FOLDERS.SUB_FOLDER}/${CONSTANTS.PAGES.ARIMINUM}`)
})

app.get('/epigraph/:id', (req, res, next) => {

  res.cookie("epigraphy_id", req.params.id)
  res.sendFile(`${DIRNAME}/${CONSTANTS.FOLDERS.TEMPLATES}/${CONSTANTS.FOLDERS.SUB_FOLDER}/${CONSTANTS.PAGES.EPIGRAPH}`)
})

/**
 * Get the entire list of epigraphs
 */
app.get('/api/epigraph', (req, res) => {

  let city = req.query.city
  let filter = {}

  if (typeof city != 'undefined')
    filter = {
      $or: [{
          'place.modern': city
        },
        {
          'place.ancient': city
        }
      ]
    }

  MONGODB.findEpigraphs(filter, (err, epigraphs) => {

    if (err) throw err

    res.send(epigraphs)
  })
})

/**
 * Get the entire list of epigraphs
 */
app.get('/api/people', (req, res) => {

  let filter = {}

  MONGODB.findPeople(filter, (err, people) => {

    if (err) throw err

    res.send(people)
  })
})

/**
 * Get the a single Epigraph by its id
 */
app.get('/api/epigraph/:id', (req, res) => {

  let filter = {
    _id: req.params.id
  }

  MONGODB.findEpigraphs(filter, (err, epigraph) => {

    // Throw given errors
    if (err) throw err

    // Or send back JSON object
    res.send(epigraph)
  })
})

/**
 * Get a single person by id
 */
app.get('/api/people/:id', (req, res) => {

  let filter = {
    _id: req.params.id
  }

  MONGODB.findPeople(filter, (err, people) => {

    if (err) throw err

    res.send(people)
  })
})

/**
 * 
 * @param {*} id 
 * @param {*} callback 
 */
function getEpigraphById(id, callback) {

  let filter = {
    '_id': id
  }

  MONGODB.findEpigraphsByFilter(filter, (err, epigraph) => {

    // Throw given errors
    if (err) callback(err)

    // Or send back JSON object
    callback(null, epigraph)
  })
}

/**
 * If none of the precedent methods are called show 404 Error
 */
app.use((req, res, next) => {

  // Update HTTP code to "404 Not Found"
  res.status(404)

  // Return 404 error
  res.sendFile(`${DIRNAME}/${CONSTANTS.FOLDERS.TEMPLATES}/${CONSTANTS.PAGES.NOT_FOUND}`)
})

/**
 * This method open the port designed PORT
 * Now the server is still listening on this port for requests
 */
app.listen(process.env.PORT || CONSTANTS.PORT)