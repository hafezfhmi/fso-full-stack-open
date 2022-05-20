import { useState } from 'react';

const BlogDetails = ({ blog }) => {
  return (
    <div>
      <p>{blog.url}</p>
      <p>likes {blog.likes}</p>
      <p>{blog.user.name}</p>
    </div>
  );
};

const Blog = ({ blog }) => {
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
      {view && <BlogDetails blog={blog} />}
    </div>
  );
};

export default Blog;
