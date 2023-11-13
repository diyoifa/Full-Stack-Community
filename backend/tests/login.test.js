const mongoose = require('mongoose')
// const User = require('../models/user')
const app = require('../app')
const supertest = require('supertest')
const helpers = require('./helpers')

const api = supertest(app)

describe('when loggin', () => {
    let user = null
    beforeEach(() => {
         user = helpers.initialsUsers[0]
    })

    test('loggin success with status 200 and json with the token', async() => {
        const {username, password} = user
        await api
        .post('/api/login')
        .send({username, password})
        .expect(200)
        .expect('Content-Type', /application\/json/)
    },10000)
    
    test('loggin fail with wrong credentials', async() => {
        
        const {body} = await api
        .post('/api/login')
        .send({username:"wrongUser", password:"wrongPasswod"})
        .expect(401)
        .expect('Content-Type', /application\/json/)

        expect(body.error).toBe('Wrong credentials')
    })
})


afterAll(()=>mongoose.connection.close())