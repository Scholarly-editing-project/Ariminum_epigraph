/**
 * This file contains only a JSON object which contains useful constants
 */

// Init the JSON object
const CONSTANTS = {
  PORT: 8080,
  NAME: 'Ariminum Epigraph',
  PAGES: {
    INDEX_PAGE: 'index.html',
  },
  FOLDERS: {
    ASSETS_FOLDER: 'assets',
  },
  DB:{
    CONNECTION: 'mongodb://localhost/Ariminum_epigraph',
    EPIGRAPH: 'Epigraphs'
  }
}

// Export the object
module.exports = CONSTANTS