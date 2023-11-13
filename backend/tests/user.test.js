const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
// const bcrypt = require('bcrypt')
// const initialsUsers = require('./helpers').initialsUsers
// const encrypt = require('./helpers').encrypt
const helpers = require('./helpers')
const mongoose = require('mongoose')

const api = supertest(app)

beforeEach(async()=>{
    await User.deleteMany({})
    for(const user of helpers.initialsUsers){
        const passwordHash = await helpers.encrypt(user.password)
        const newUser = new User({
            username: user.username,
            email: user.email,
            passwordHash
        })
        await newUser.save()
    }
},10000)

describe('creating a user', () => {
    test('new user success with a status 201 and a json', async () => {
        const newUser = {
            username: 'test3',
            email: 'test3@gmail.com',
            password: '123'
        }
        const usersAtStart = await helpers.usersInDb()
        // console.log("🚀 ~ file: user.test.js:32 ~ test.only ~ usersAtStart:", usersAtStart)
        const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helpers.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length+1)
        const usernames =  usersAtEnd.map( user => user.username)
        expect(usernames).toContain(response.body.username)

    })
})



afterAll(()=> mongoose.connection.close())