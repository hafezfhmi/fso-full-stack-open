import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog);

  const blogFormRef = useRef();

  const handleCreateBlog = async (blog) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(blog));
  };

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>
      <div id="blog-wrapper">
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
