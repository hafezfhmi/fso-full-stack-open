import { useState } from 'react';

const BlogDetails = ({ blog, updateBlogLikes }) => {
  return (
    <div>
      <p>{blog.url}</p>
      <p>
        likes {blog.likes}{' '}
        <button
          onClick={() => {
            updateBlogLikes(blog);
          }}
        >
          like
        </button>
      </p>
      <p>{blog.user.name}</p>
    </div>
  );
};

const Blog = ({ blog, updateBlogLikes }) => {
  const [view, setView] = useState(false);

  const toggleView = () => {
    setView((prevView) => !prevView);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={toggleView}>{!view ? 'view' : 'hide'}</button>
      {view && <BlogDetails blog={blog} updateBlogLikes={updateBlogLikes} />}
    </div>
  );
};

export default Blog;
