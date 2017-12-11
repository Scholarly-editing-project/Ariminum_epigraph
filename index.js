
const express = require('express')
const app = express()

const DIRNAME = __dirname
const PORT = 8080

app.get('/', function (req, res) {
  res.sendFile(`${DIRNAME}/index.html`)
})

app.listen(PORT, function () {
  console.log('Example app listening on port 3000!')
})