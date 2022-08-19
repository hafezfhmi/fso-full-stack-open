import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import blogServices from "../services/blogs";
import {
  updateBlog,
  updateBlogLikes,
  deleteBlog,
} from "../reducers/blogReducer";

const Blog = () => {
  const dispatch = useDispatch();
  let blogId = useParams().blogId;
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const blog = useSelector((state) =>
    state.blog.find((currentBlog) => currentBlog.id == blogId)
  );

  useEffect(() => {
    (async () => {
      let blogData = await blogServices.getBlog(blogId);
      dispatch(updateBlog(blogData));
    })();
  }, []);

  const handleUpdateBlogLikes = async (blog) => {
    dispatch(updateBlogLikes(blog));
  };

  const handleDeleteBlog = async (blogId) => {
    dispatch(deleteBlog(blogId));
    navigate("/");
  };

  if (!blog) return null;

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>

      <a href={blog.url}>{blog.url}</a>
      <p>
        likes {blog.likes}{" "}
        <button
          onClick={() => {
            handleUpdateBlogLikes(blog);
          }}
        >
          like
        </button>
      </p>
      <p>added by {blog.user.name}</p>
      {user.username === blog.user.username && (
        <button
          onClick={() => {
            handleDeleteBlog(blog.id);
          }}
        >
          remove
        </button>
      )}
    </div>
  );
};

export default Blog;
