const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user");

    response.json(blogs);
  } catch (err) {
    next(err);
  }
});

blogsRouter.get("/:id", async (request, response, next) => {
  try {
    let blogId = request.params.id;
    const blogs = await Blog.findById(blogId).populate("user");

    response.json(blogs);
  } catch (err) {
    next(err);
  }
});

blogsRouter.post("/", async (request, response, next) => {
  try {
    const { title, author, url, likes } = request.body;

    const token = request.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({ title, author, user: user._id, url, likes });

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (err) {
    next(err);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  try {
    const body = request.body;

    const newBlog = {
      likes: body.likes,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      newBlog,
      { new: true }
    ).populate("user");

    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const token = request.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const blogToDelete = await Blog.findById(request.params.id);

    if (decodedToken.id.toString() !== blogToDelete.user.toString()) {
      return response
        .status(401)
        .json({ error: "you don't have the permission to delete this blog" });
    }

    await Blog.findByIdAndDelete(request.params.id);

    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.post("/:id/comments", async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const { comment } = req.body;

    let updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { comments: comment },
      },
      { new: true }
    );

    res.status(201).json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
