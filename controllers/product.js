'use strict'

const Product = require('../models/product')

async function getProduct(req, res) {
  console.log(`GET product by id ${req.params.productId}`)
  try {
    const product = await Product.findById({ _id: req.params.productId }).populate(
      'user',
      'email displayName'
    )
    if (!product) {
      return res.status(404).send({ message: `Product not found with id: ${req.params.productId}` })
    }
    return res.status(200).send(product)
  } catch (error) {
    return res.status(500).send({ message: `Error on database request: ${error}` })
  }
}

async function getProducts(req, res) {
  try {
    const products = await Product.find({}).populate('user', 'email displayName')
    return res.status(200).send({ products })
  } catch (error) {
    return res.status(500).send({ message: `Error on database request: ${error}` })
  }
}

async function saveProduct(req, res) {
  console.log('POST /api/product')
  console.log(`object ${JSON.stringify(req.body)}`)
  if (!req.body.name) {
    const msg = "Attribute 'name' is necessary for Product"
    return res.status(400).send({ message: `Error when saving product: ${msg}` })
  }

  let product = new Product()
  product.name = req.body.name
  product.picture = req.body.picture || '/images/x1extreme4-1500x1000.jpg'
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description
  product.user = req.user

  product.save((err, productStored) => {
    if (err) {
      res.status(500).send({ message: `Error when saving product: ${err}` })
    }
    res.status(200).send({ product: productStored })
  })
}

async function updateProduct(req, res) {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.productId },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    )
    if (!product) {
      return res.status(404).send({ message: `Product not found with id: ${req.params.productId}` })
    }
    return res.status(200).send(product)
  } catch (error) {
    return res.status(500).send({ message: `Error on database request: ${error}` })
  }
}

async function deleteProduct(req, res) {
  try {
    const product = await Product.findById({ _id: req.params.productId })
    if (!product) {
      return res.status(404).send({ message: `Product not found with id: ${req.params.productId}` })
    }
    await product.remove()
    return res.status(200).send(product)
  } catch (error) {
    return res.status(500).send({ message: `Error on database request: ${error}` })
  }
}

module.exports = {
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct,
}
