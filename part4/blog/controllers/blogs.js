const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({});

    response.json(blogs);
  } catch (err) {
    next(err);
  }
});

blogsRouter.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body);

    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (err) {
    next(err);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);

    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
