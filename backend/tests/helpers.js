const User = require('../models/user')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const initialsUsers = [
    {
        username: 'test',
        email: 'test@gmail.com',
        password:'123'
    },
    {
        username: 'test2',
        email: 'test2@gmail.com',
        password:'123'
    }
]

const usersInDb = async () => {
    const users = await User.find({})
    return users.map( user => user.toJSON())
}

const encrypt = async(password) => {
    const saltRounds = 10
    return await bcrypt.hash(password, saltRounds)
}

const blogsInDb = async() => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}


const startUser = async(api) => {
    //clean everything
    await Blog.deleteMany({})
    await User.deleteMany({})

    //create New user
    const user = initialsUsers[0]
    await api
    .post('/api/users')
    .send(user)
    
    //login with that user
    const {body} = await api
    .post('/api/login')
    .send({username: user.username, password: user.password})

    return body.token
}

module.exports = {
    initialsUsers,
    encrypt,
    usersInDb,
    startUser,
    blogsInDb
}