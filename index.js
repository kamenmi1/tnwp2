'use strict'

const mongoose = require('mongoose');
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, {useNewUrlParser: true}, err => {
  if (err) {
    console.log(`Error on database: ${err}`)
    throw err;
  }
  app.listen(config.port, () => {
    console.log(`Running server in port ${config.port}`)
  })
})

