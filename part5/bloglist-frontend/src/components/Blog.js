/* eslint-disable react/prop-types */
import { useState } from "react";

const BlogDetails = ({ blog, updateBlogLikes, deleteBlog, user }) => {
  const handleDeleteBlog = () => {
    let deleteConfirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`
    );

    if (deleteConfirm) {
      deleteBlog(blog.id);
    }
  };

  return (
    <div>
      <p>{blog.url}</p>
      <p>
        likes {blog.likes}{" "}
        <button
          onClick={() => {
            updateBlogLikes(blog);
          }}
        >
          like
        </button>
      </p>
      <p>{blog.user.name}</p>
      {user.username === blog.user.username && (
        <button onClick={handleDeleteBlog}>remove</button>
      )}
    </div>
  );
};

const Blog = ({ blog, updateBlogLikes, deleteBlog, user }) => {
  const [view, setView] = useState(false);

  const toggleView = () => {
    setView((prevView) => !prevView);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}
      <button onClick={toggleView}>{!view ? "view" : "hide"}</button>
      {view && (
        <BlogDetails
          blog={blog}
          updateBlogLikes={updateBlogLikes}
          deleteBlog={deleteBlog}
          user={user}
        />
      )}
    </div>
  );
};

export default Blog;
