/**
 * Controlador para manejar los comentarios de los blogs.
 * @module commentController
 */
const mongoose = require('mongoose')
const commentRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')
const userExtractor = require('../middlewares/userExtractor').userExtractor
/**
 * Crea un nuevo comentario en un blog.
 * @name post/nuevoComentario
 * @function
 * @memberof module:commentController
 * @param {Object} request - Objeto de solicitud de Express.
 * @param {Object} response - Objeto de respuesta de Express.
 * @param {Function} next - Función de middleware de Express.
 * @throws {Error} Error de servidor.
 * @returns {Object} Objeto JSON con el comentario creado.
 */

commentRouter.post('/', userExtractor, async (request, response, next) => {
    try {
        const body = request.body
        const blog = await Blog.findById(body.blogId)
        console.log("🚀 ~ file: comment.js:26 ~ commentRouter.post ~ blog:", blog)
        const user = request.user
        console.log("🚀 ~ file: comment.js:28 ~ commentRouter.post ~ user:", user)
        const comment = new Comment({
            content: body.content,
            blog: blog._id,
            user: user._id
        })
        const savedComment = await comment.save()
        blog.comments = blog.comments.concat(savedComment._id)
        await blog.save()

        response.status(201).json(savedComment)

    } catch (error) {
        next(error)
    }

})


module.exports = commentRouter
