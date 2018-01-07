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

const MONGODB_URI = process.env.MONGODB_URI

// Connext to mongodb 
mongoose.connect(MONGODB_URI)

/**
 * This function allows front-end html files to load any asset file 
 * stored inside the folder named "assets"
 */
app.use(express.static(CONSTANTS.FOLDERS.TEMPLATES))

let toSaveEpigraph = {
  "_id": "ariminum_0001",
  "title": [
    "LIBERTEIS HISCE FECERE",
    "PATRONO Q OVI Q L BARG",
    "Q NADIACVS Q PILON",
    "Q OVI C F FREG HIC SEPVLT",
    "QVOD SVIS DEDIT APPARE"

  ],
  "transcription": [
    "Liberteis hisce fecere",
    "patrono Q(uintus) Ovi(us) Q(uinti) l(ibertus) Barg(ates?)",
    "Q(uintus) Nadiacus Q(uintus) Pilon(icus)",
    "Q(uintus) Ovi(us) C(ai) f(ilius) Freg(ellanus) hic sepult(us)",
    "quod suis dedit appare(t)"
  ],
  "translation": [
    "Freedmen did that",
    "to their master. (made by) Quintus Ovius Bargates, freedman of Quintus;",
    "Quintus Ovius Nadiacus, freedman of Quintus; Quintus Ovius Pilonicus, freedman of Quintus.",
    "Quintus Ovius Fregellanus, son of Caius, is buried here.",
    "What he gave is shown."
  ],
  "repository": "Lapidario Romano Rimini",
  "support": "Grave Monument",
  "material": "unknown",
  "size": {
    "structure": [
      "Description: made by six stone blocks",
      "upper_block: 0.28 mt x 1.325 mt x 0.765 mt",
      "middle-right_block: 0.295 mt x 0.64 mt x 0.61 mt",
      "middle-left_block: 0.30 mt x 0.64 mt x 1.275 mt",
      "lower-right_block: 0.60 mt x 0.23 mt x 1.295 mt",
      "lower-middle_block: 0.61 mt x 0.77 mt x 0.35 mt",
      "lower-left_block: 0.605 mt x 0.295 mt x 1.31 mt"
    ],
    "letters": "9.9~8 mt"
  },
  "place": {
    "ancient": "Ariminum",
    "modern": "Rimini",
    "geo": {
      "accuracy": "Medium",
      "lat": "borgo s. giovanni",
      "len": "borgo s. giovanni"
    }
  },
  "people": [
    "quintus_ovius_bargates",
    "quintus_ovius_nadiacus",
    "quintus_ovius_pilonicus",
    "quintus_ovius_fregellanus"
  ],
  "actions": [
    "dedication_qoviusfreg"
  ],
  "date": "beginning of 1st century B.C.",
  "bibliographies": [{
    "citation": "Donati, Angela. 1981. Il Lapidario romano: Rimini antica. Rimini: Comune di Rimini, Assessorato alla cultura, Musei della città.",
    "uri": "https://www.worldcat.org/title/lapidario-romano-rimini-antica/oclc/949079595"
  }]
}

MONGODB.save(toSaveEpigraph, (err, epigraph) => {
  if (err) throw err

  console.log(epigraph)
})

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

  MONGODB.findByFilter(filter, (err, epigraphs) => {

    if (err) throw err

    res.send(epigraphs)
  })
})

/**
 * Get the a single Epigraph by its id
 */
app.get('/api/epigraph/:id', (req, res) => {

  let filter = {
    '_id': id
  }

  MONGODB.findByFilter(filter, (err, epigraph) => {

    // Throw given errors
    if (err) throw err

    // Or send back JSON object
    res.send(epigraph)
  })
})

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