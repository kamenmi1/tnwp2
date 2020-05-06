'use strict'

const services = require('../services')
const User = require('../models/user')

// check time
// check valid
async function isAuth(req, res, next) {
  try {
    if (!req.headers.authorization) {
      return res.status(403).send({ message: 'Do not have access.' })
    }

    const token = req.headers.authorization.split(' ')[1] // avoid bearer text
    const payload = await services.decodeToken(token)
    const user = await User.findById(payload.sub)
    if (!user) {
      const err = Error('User not found')
      err.status = 403
      throw err
    }
    req.user = user
    next()
  } catch (error) {
    return res.status(error.status).send({ message: error.message })
  }
}

module.exports = isAuth
