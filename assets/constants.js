/**
 * This file contains only a JSON object which contains useful constants
 */

// Init the JSON object
const CONSTANTS = {
  PORT: 5000,
  NAME: 'Ariminum Epigraph',
  PAGES: {
    INDEX_PAGE: 'index.html',
    NOT_FOUND: "404.html",
    PROJECT: 'project.html',
    INSCRIPTIONS: 'inscriptions.html',
    CONTACT: 'contact.html'
  },
  FOLDERS: {
    ASSETS: 'assets',
    TEMPLATES: 'templates',
  },
  DB: {
    CONNECTION: 'mongodb://localhost/Ariminum_epigraph',
    EPIGRAPH: 'Epigraphs'
  }
}

// Export the object
module.exports = CONSTANTS