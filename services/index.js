const jwt = require('jwt-simple')
const dayjs = require('dayjs')
const config = require('../config')

function generateToken(user) {
  const payload = {
    sub: user._id,
    // token creation
    iat: dayjs().unix(),
    // expiration toke
    exp: dayjs().add(14, 'day').unix()

  }
  return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken(token) {
  const decoded = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, config.SECRET_TOKEN)
      if(payload.exp <= dayjs().unix()){
        reject({
          status: 401,
          message: 'Token expired.'
        })
      }
      resolve(payload)
    } catch (error) {
      reject ( {
        status: 403,
        message: 'Invalid token.'
      } )
    }
  })
  return decoded
}

module.exports = {
  generateToken,
  decodeToken
}