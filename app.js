'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars')

const api = require('./routes')
const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.engine('.hbs', hbs({
  defaultLayout: 'default',
  extname: '.hbs'
}))
app.set('view engine', '.hbs')

app.use('/api', api)
app.get('/login', (req, res) => {
  res.render('login')
})
app.get('/', (req, res) => {
  res.render('products')
})
app.get('/loginPage', (req, res) => {
  res.render('loginPage')
})

module.exports = app
