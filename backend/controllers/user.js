const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
 
userRouter.post('/', async(request, response, next)=>{
    try {
        const body = request.body
        console.log("🚀 ~ file: user.js:8 ~ userRouter.post ~ body:", body)
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            email: body.email,
            passwordHash
        })

        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch (error) {
        next(error)
    }
})


module.exports = userRouter