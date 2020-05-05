'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = require('./user')

const ProductSchema = Schema({
  name: String,
  picture: String,
  price: { type: Number, default: 0 },
  // category: { type: String, enum: ['computers', 'phones', 'accesories'] },
  description: String,
  user: { type: Schema.Types.ObjectId, require: true, ref: 'User' },
})

module.exports = mongoose.model('Product', ProductSchema)
