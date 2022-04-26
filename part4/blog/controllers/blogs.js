const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response, next) => {
  try {
    Blog.find({}).then((blogs) => {
      response.json(blogs);
    });
  } catch {
    (err) => next(err);
  }
});

blogsRouter.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body);

    blog.save().then((result) => {
      response.status(201).json(result);
    });
  } catch {
    (err) => next(err);
  }
});

module.exports = blogsRouter;
