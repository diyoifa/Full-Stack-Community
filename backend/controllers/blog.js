const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const userExtractor = require('../middlewares/userExtractor').userExtractor

blogRouter.post('', userExtractor, async(request, response, next) => {
   try {
    const user = request.user
    console.log("🚀 ~ file: blog.js:8 ~ blogRouter.post ~ user:", user)
    const body = request.body
    const blog = new Blog({
        title: body.title,
        content: body.content,
        image: body.image,
        user: user._id
    })
    const savedBlog = await blog.save()
    console.log("🚀 ~ file: blog.js:17 ~ blogRouter.post ~ savedBlog:", savedBlog)
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
   } catch (error) {
    next(error)
   }
})

blogRouter.get('/', async(request, response, next) => {
    try {
        const blogs  = await Blog.find({}).populate('comments').populate('user')
        console.log("🚀 ~ file: blog.js:29 ~ blogRouter.get ~ blogs:", blogs)
        response.status(200).json(blogs) 
    } catch (error) {
        next(error)
    }
})

blogRouter.get('/:id', async(request, response, next) => {
    try {
        const id = request.params.id
        const blog = await Blog.findById(id)
        console.log("🚀 ~ file: blog.js:40 ~ blogRouter.get ~ blog:", blog)
        response.status(200).json(blog)
    } catch (error) {
        next(error)
    }
})

blogRouter.delete('/:id', userExtractor, async(request, response, next) => {
    try {
         //obtenemos el id del blog de los parametros
         const id = request.params.id
         console.log("🚀 ~ file: blog.js:52 ~ blogRouter.delete ~ id:", id)
         //obtenemos el usuario del middleware
         const user  = request.user
         //validar que el usuario que creó el blog sea el mismo que lo elimine
         const idBlogInUser = user.blogs.find( _id => _id.toString() === id.toString())
         console.log("🚀 ~ file: blog.js:56 ~ blogRouter.delete ~ idBlogInUser:", idBlogInUser)
         await Blog.findByIdAndDelete(idBlogInUser)
         //eliminar el blog del array de blogs del usuario
         user.blogs = user.blogs.filter(_id => _id !== idBlogInUser)
         await user.save()
         //eliminar todos los comentarios asociados a ese blog
         await Comment.deleteMany({blog: idBlogInUser})
         //finalmente retornamos un status 204 si todo sale bien
         response.status(204).end()
        
    } catch (error) {
        //si algo sale mal el middleware de erros se encarga de retornar el error
        next(error)
    }
})

blogRouter.put('/:id', userExtractor, async(request, response, next) => {
    try {
        const id = request.params.id
        // console.log("🚀 ~ file: blog.js:76 ~ blogRouter.put ~ id:", id)
        const body = request.body
        const user = request.user

        const idBlogInUser =  user.blogs.find( _id => _id.toString() === id.toString())
        // console.log("🚀 ~ file: blog.js:80 ~ blogRouter.put ~ idBlogInUser:", idBlogInUser)

        const updatedBlog = await Blog.findByIdAndUpdate(idBlogInUser, body, { new : true })
        response.status(201).json(updatedBlog)
    } catch (error) {
        next(error)
    }
})

module.exports = blogRouter
