const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')
const path = require('path')
var cors = require('cors')

const api = require('./routes')
const app = express()

// TODO: cors, be specific.
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.engine(
  '.hbs',
  hbs({
    defaultLayout: 'default',
    extname: '.hbs',
  })
)
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, './views'))
app.use(express.static(path.join(__dirname, './public')))

app.use('/api', api)
app.get('/login', (req, res) => {
  res.render('login', {})
})
app.get('/', (req, res) => {
  res.render('products')
})
app.get('/loginPage', (req, res) => {
  res.render('loginPage')
})

module.exports = app
