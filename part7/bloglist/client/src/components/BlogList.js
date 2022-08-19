import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import { Table } from "react-bootstrap";

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
      <h2 className="my-4">Blog List</h2>

      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>
      <Table striped>
        <tbody>
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BlogList;
