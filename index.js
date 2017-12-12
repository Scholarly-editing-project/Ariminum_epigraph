/**
 * Express server used to manage requests 
 */

// Import all needed libraries
const express = require('express')
const app = express()

// Store some useful and global constants
const DIRNAME = __dirname

// Import the JSON structure stored inside the file "constants.js"
const CONSTANTS = require('./constants')

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
 * This function allows front-end html files to load any asset file 
 * stored inside the folder named "assets"
 */
app.use(express.static(CONSTANTS.FOLDERS.ASSETS_FOLDER))

/**
 * This method open the port designed PORT
 * 
 * Now the server is still listening on this port for requests
 */
app.listen(CONSTANTS.PORT, function () {
  console.log(`${CONSTANTS.NAME} listening on port ${CONSTANTS.PORT}!`)
})