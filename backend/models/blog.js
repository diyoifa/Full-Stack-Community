const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const blogSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: {type: String, required:false},
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Comment'
        }
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

blogSchema.plugin(uniqueValidator);

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

module.exports = mongoose.model('Blog', blogSchema);