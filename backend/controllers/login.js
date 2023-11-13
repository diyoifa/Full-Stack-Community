const User = require('../models/user')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

loginRouter.post('', async (request, response, next) => {
    try {
        const body = request.body
        const user = await User.findOne({ username: body.username });
        // console.log("🚀 ~ file: login.js:8 ~ loginRouter.post ~ user:", user)
        const passwordCorrect = user === null
            ? false
            : await bcrypt.compare(body.password, user.passwordHash)

        if (!(user && passwordCorrect)) {
            response.status(401).json({ error: 'Wrong credentials' })
        }else{
            const userForToken = {
                username: user.username,
                id: user._id
            }
    
            const token = jwt.sign(userForToken, config.SECRET)
            response.status(200).json({ username: user.username, token })
        }   
    } catch (error) {
        next(error)
    }
})

module.exports = loginRouter
