import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import blogServices from "../services/blogs";
import {
  updateBlog,
  updateBlogLikes,
  addBlogComment,
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

  const handleUpdateBlogLikes = async () => {
    dispatch(updateBlogLikes(blog));
  };

  const handleDeleteBlog = async () => {
    dispatch(deleteBlog(blog.id));
    navigate("/");
  };

  const handleAddComment = async (event) => {
    event.preventDefault();

    const comment = event.target.comment.value;
    dispatch(addBlogComment(blog.id, comment));
    event.target.comment.value = "";
  };

  if (!blog) return null;

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>

      <a href={blog.url}>{blog.url}</a>
      <p>
        likes {blog.likes} <button onClick={handleUpdateBlogLikes}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
      {user.username === blog.user.username && (
        <button onClick={handleDeleteBlog}>remove</button>
      )}

      <h3>comments</h3>
      <form onSubmit={handleAddComment}>
        <input type="text" name="comment" />
        <button type="submit">add comment</button>
      </form>

      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
