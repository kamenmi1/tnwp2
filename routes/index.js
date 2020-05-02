'use strict'

const express = require('express');
const api = express.Router();
const productCtrl = require('../controllers/product');
const auth = require('../midlewares/auth')
const login = require('../controllers/user')

api.get('/product', productCtrl.getProducts);
api.get('/product/:productId', productCtrl.getProducts);
api.post('/product', auth, productCtrl.saveProduct);
api.put('/product/:productId', auth, productCtrl.updateProduct);
api.delete('/product/:productId', auth, productCtrl.deleteProduct);

api.post('/signin', login.signIn)
api.post('/signup', login.signUp)

api.get('/private', auth, (req, res) => res.status(200).send({ message: 'Granted' }))

module.exports = api;
