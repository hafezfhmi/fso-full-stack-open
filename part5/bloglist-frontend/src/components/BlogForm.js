import React, { useState } from 'react';
import blogService from '../services/blogs';

const BlogForm = ({ setBlogs, handleNotification }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    try {
      let newBlog = await blogService.addBlog({ title, author, url });
      setBlogs((latestBlogs) => latestBlogs.concat(newBlog));
      handleNotification({ message: `a new blog ${title} by ${author} added` });

      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (error) {
      handleNotification({
        message: `error creating new blog`,
        type: 'danger',
      });
    }
  };

  return (
    <form onSubmit={handleCreateBlog}>
      <div>
        title:
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
