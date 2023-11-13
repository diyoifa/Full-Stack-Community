/**
 * Mongoose schema for Comment model.
 * @typedef {Object} CommentSchema
 * @property {string} content - The content of the comment.
 * @property {mongoose.Schema.Types.ObjectId} blog - The ID of the blog the comment belongs to.
 * @property {mongoose.Schema.Types.ObjectId} user - The ID of the user who created the comment.
 */

/**
 * Mongoose model for Comment.
 * @typedef {import('mongoose').Model<CommentSchema>} CommentModel
 */

const mongoose = require('mongoose');

const commentSchema =  mongoose.Schema({
    content: String,
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

commentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

/**
 * Comment model.
 * @type {CommentModel}
 */
module.exports =  mongoose.model('Comment', commentSchema)