/**
 * Express app with middleware, controllers and endpoints.
 * @module app
 * @requires express
 * @requires cors
 * @requires ./middlewares/requestLogger
 * @requires ./middlewares/unkwonEndpoint
 * @requires ./middlewares/errorHandler
 * @requires ./utils/connect
 * @requires ./controllers/user
 * @requires ./controllers/login
 * @requires ./controllers/blog
 * @requires ./controllers/comment
 */
const express = require('express')
const cors = require('cors')

//middlewares
const requestLogger = require('./middlewares/requestLogger')
const unkwonEndpoint = require('./middlewares/unkwonEndpoint')
const errorHandler = require('./middlewares/errorHandler')

//connection
const connect = require('./utils/connect')

//controllers
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const blogRouter = require('./controllers/blog')
const commentRouter = require('./controllers/comment')

const app = express()

connect()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(requestLogger)

//endpoints
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/comment', commentRouter)


app.use(unkwonEndpoint)
app.use(errorHandler)

module.exports = app

