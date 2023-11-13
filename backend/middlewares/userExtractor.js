const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const User = require('../models/user')

const getToken = (request) => {
    const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    return authorization.substring(7)
  }
}


const userExtractor = async (request, response, next) => {
    try {
        const token = getToken(request)
        const decodedToken = jwt.verify(token, config.SECRET)
        const user = await User.findById(decodedToken.id)
        // console.log("🚀 ~ file: userExtractor.js:18 ~ userExtractor ~ user:", user)
        request.user = user
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    userExtractor
}