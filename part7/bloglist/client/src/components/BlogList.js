import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBlog,
  updateBlogLikes,
  deleteBlog,
} from "../reducers/blogReducer";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog);
  const user = useSelector((state) => state.user);

  const blogFormRef = useRef();

  const handleCreateBlog = async (blog) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(blog));
  };

  const handleUpdateBlogLikes = async (blog) => {
    dispatch(updateBlogLikes(blog));
  };

  const handleDeleteBlog = async (blogId) => {
    dispatch(deleteBlog(blogId));
  };

  return (
    <div>
      <h2>create new</h2>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>
      <div id="blog-wrapper">
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlogLikes={handleUpdateBlogLikes}
              deleteBlog={handleDeleteBlog}
              user={user}
            />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
