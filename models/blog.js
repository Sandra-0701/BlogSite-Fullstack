const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: String, 
    description: String,
    image: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Blog = mongoose.model('Blog', schema);

module.exports = Blog;
