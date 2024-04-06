const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog');


function verifyToken(req,res,next) {

    const token = req.headers.token;
    try{
        if(!token) throw 'unauthorized access';
        let payload = jwt.verify(token,'sandra');
        if(!payload) throw 'unauthorized access';
        next()


    } catch(error){
        res.status(484).send('Caught in error')
    }
    


}
// Get all blogs
router.get('/', verifyToken,async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get a single blog by ID
router.get('/:id', verifyToken,async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create a new blog
router.post('/add', verifyToken,async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const newBlog = await Blog.create({ name, description, image });
    res.status(201).json({ message: 'Blog added', data: newBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update a blog by ID
router.put('/:id', verifyToken,async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { name, description, image }, { new: true });
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog updated', data: updatedBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a blog by ID
router.delete('/:id', verifyToken,async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog deleted', data: deletedBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
