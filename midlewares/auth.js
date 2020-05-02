'use strict'

const services = require('../services')

// check time
// check valid
async function isAuth(req, res, next) {
  try {
    if(!req.headers.authorization) {
      return res.status(403).send({ message: 'Do not have access.' })
    }
    
    const token = req.headers.authorization.split(' ')[1] // avoid bearer text
    const payload = await services.decodeToken(token)
    req.user = payload.stub
    next()
  } catch (error) {
    return res.status(error.status).send({ message: error.message})
  }
}

module.exports = isAuth
