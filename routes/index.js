'use strict'

const express = require('express');
const api = express.Router();
const productCtrl = require('../controllers/product');
const auth = require('../midlewares/auth')
const login = require('../controllers/user')

api.get('/products', productCtrl.getProducts);
api.get('/products/:productId', productCtrl.getProducts);
api.post('/products', auth, productCtrl.saveProduct);
api.put('/products/:productId', auth, productCtrl.updateProduct);
api.delete('/products/:productId', auth, productCtrl.deleteProduct);

api.post('/signin', login.signIn)
api.post('/signup', login.signUp)

api.get('/private', auth, (req, res) => res.status(200).send({ message: 'Granted' }))

module.exports = api;
