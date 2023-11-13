const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const helpers = require('./helpers')

const api = supertest(app)

let token = null
let blog = null
beforeEach(async() => {
    token = await helpers.startUser(api)
    console.log("🚀 ~ file: blog.test.js:34 ~ beforeEach ~ token:", token)
    const {body} =  await api
        .post('/api/blogs')
        .send({
            title: 'blog test',
            content: 'blog test',
            image: 'blog image',
        })
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    blog = body

}, 15000)

describe('when create a  blog', () => {
    test('creating success with status 201 and json with the new blog', async() => {
        const blog = {
            title: 'blog test',
            content: 'blog test',
            image: 'blog image',
        }
        await api
        .post('/api/blogs')
        .send(blog)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        
    })
    test('create fails with status 401 if token  is not provided', async()=>{
        const blog = {
            title: 'blog tes2',
            content: 'blog tes2',
            image: 'blog image',
        }

        const {body} =  await api
        .post('/api/blogs')
        .send(blog)
        // .set('Authorization', `Bearer ${token}`)
        .expect(401)
        .expect('Content-Type', /application\/json/)

        expect(body.error).toBe('token missing or invalid')
    })
})

describe('when getting blogs', () => {
    test('all blogs success with status 200 and a json', async() => {
        const blogsAtStart =  await helpers.blogsInDb()
        const {body} = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

        expect(body).toHaveLength(blogsAtStart.length)

    })

    test('single blog succes with status 200 and a json', async() => {
        const response = await api
        .get(`/api/blogs/${blog.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        expect(response.body).toEqual(blog)
    })
})

describe('when deleting a blog', () => {
    test('delete success with status 204', async() => {
        await api
        .delete(`/api/blogs/${blog.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)
    })
    test('delete fails with status 401 if token is not provided', async() => {
        await api
        .delete(`/api/blogs/${blog.id}`)
        .expect(401)
    })
})

describe('when updating a blog', () => {
    test('update succes with status', async() => {
        const {body} = await api
        .put(`/api/blogs/${blog.id}`)
        .send({
            title: 'updated title blog'
        })
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        expect(body.title).toBe('updated title blog')

    }, 10000)
    test('update fails with status 401 if token is not provided', async() => {
        await api
        .put(`/api/blogs/${blog.id}`)
        .send({
            title: 'updated title blog'
        })
        .expect(401)
        .expect('Content-Type', /application\/json/)
    })
})

afterAll(() => mongoose.connection.close())