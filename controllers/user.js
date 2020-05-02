'use strict'

const User = require('../models/user')
const services = require('../services')

// create new user
async function signUp(req, res) {
  try {
    const user = new User({
      email: req.body.email,
      displayName: req.body.displayName,
      password: req.body.password
    })
    const storedUser = await user.save()
    return res.status(200).send({ token: services.generateToken(user) })
  } catch (error) {
    return res.status(500).send({ message: `Error on user creation: ${error}` })
  }
}

// retrieve a token for an existing user
// TODO: validate user password
async function signIn(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(404).send({ message: 'User not found' })
    req.user = user
    return res.status(200).send({ message: 'user logged', token: services.generateToken(user) })
  } catch (error) {
    return res.status(500).send({ message: `Error signIn: ${error}` })
  }
}

module.exports = {
  signUp,
  signIn
}