const mongoose = require('mongoose')
const User = require('../models/user')
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const helpers = require('./helpers')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('when ceating a comment', () => {

    let token = null
    let blog = null

    beforeEach( async () => {
       await Comment.deleteMany({})
       token = await helpers.startUser(api)
       
       //create a blog
       const response = await api
       .post('/api/blogs')
       .send({
           title: 'blog test',
           content: 'blog test',
           image: 'blog image',
       })
       .set('Authorization', `Bearer ${token}`)

       blog = response.body
       console.log("🚀 ~ file: comment.test.js:47 ~ beforEach ~ blog:", blog)

    })

    test('comment sucess with status 201 and a json with the comment', async () => {
        const comment = {
            content:'comment test',
            blogId: blog.id,
        }

        await api
        .post('/api/comment')
        .send(comment)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    })
})


afterAll(() => mongoose.connection.close())
