/**
 * This script is about the insertion of collection in database
 * 
 * 
 * RUN from root folder:
 * mongo 127.0.0.1/Ariminum_epigraph db/scripts/insert.js
 */

// Instantiate the object
var object = {}

// Insert the json object
db.Epigraphs.insert(object)